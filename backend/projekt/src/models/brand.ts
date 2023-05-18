export class Brand {
    brandID: number | null;
    brandName: string;
    brandContractStart: Date;
    brandContractEnd: Date;
}

export class BrandDTO {
    brandid: number | null;
    brandname: string;
    brandcontractstart: string;
    brandcontractend: string;

    static validate(brand): [boolean, string[]] {
        let isValid = true;
        let wrongAttributes: string[] = [];


        if (!brand.brandname || brand.brandname.length > 200) {
            isValid = false;
            wrongAttributes.push("brandname");
        }
        
        if (!brand.brandcontractstart) {
            isValid = false;
            wrongAttributes.push("brandcontractstart");
        } else {
            const start = new Date(brand.brandcontractstart);
            if (isNaN(start.getTime())) {
                isValid = false;
                wrongAttributes.push("brandcontractstart");
            }
        }

        if (!brand.brandcontractend) {
            isValid = false;
            wrongAttributes.push("brandcontractend");
        } else {
            const end = new Date(brand.brandcontractend);
            if (isNaN(end.getTime())) {
                isValid = false;
                wrongAttributes.push("brandcontractend");
            }
        }

        if (brand.brandcontractstart && brand.brandcontractend) {
            const start = new Date(brand.brandcontractstart);
            const end = new Date(brand.brandcontractend);
            if (start >= end) {
                isValid = false;
                wrongAttributes.push("brandcontractstart");
                wrongAttributes.push("brandcontractend");
            }
        }

    
        return [isValid, wrongAttributes]
    }

}