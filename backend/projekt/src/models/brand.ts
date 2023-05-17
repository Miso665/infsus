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

    static validate(brand: BrandDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        if (brand.brandname.length > 200) {
            isValid = false;
            wrongAttributes.push("brandname");
        }
    
        const start = new Date(brand.brandcontractstart);
        const end = new Date(brand.brandcontractend);

        if (isNaN(start.getTime())) {
            isValid = false;
            wrongAttributes.push("brandcontractstart");
        }

        if (isNaN(end.getTime())) {
            isValid = false;
            wrongAttributes.push("brandcontractend");
        }

        if (start >= end) {
            isValid = false;
            wrongAttributes.push("brandcontractstart");
            wrongAttributes.push("brandcontractend");
        }
    
        return [isValid, wrongAttributes];
    }

}