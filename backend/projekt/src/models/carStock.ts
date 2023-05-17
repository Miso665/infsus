import { dbGetAllModelIDs } from "../db/modelDBAccess";
import { Model } from "./model";

export class CarStock {
    stockID: number;
    stockPrice: number;
    stockColor: string;
    stockRims: string;
    stockBought: boolean;
    model: Model;
}

export class CarStockDTO {
    stockid: number;
    stockprice: number;
    stockcolor: string;
    stockrims: string;
    stockbought: boolean;
    modelid: number;

    static async validate(stock: CarStockDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        if (stock.stockprice < 0) {
            isValid = false;
            wrongAttributes.push("stockprice");
        }

        if (stock.stockcolor.length > 100) {
            isValid = false;
            wrongAttributes.push("stockcolor");
        }

        if (stock.stockrims.length > 200) {
            isValid = false;
            wrongAttributes.push("stockrims");
        }

        if (!(await dbGetAllModelIDs()).includes(stock.modelid)) {
            isValid = false;
            wrongAttributes.push("modelid");
        }

        return [isValid, wrongAttributes];
    }

}