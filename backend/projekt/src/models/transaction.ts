import { dbGetAllUserIDs } from "../db/userDBAccess";
import { CarStock } from "./carStock";
import { User } from "./user";
import { dbGetAllCarStockIDs } from "../db/carStockDBAccess";

export class Transaction {
    transactionTime: Date;
    transactionValue: number;
    transactionID: number;
    user: User;
    stock: CarStock;

}



export class TransactionDTO {
    transactiontime: string;
    transactionvalue: number;
    transactionid: number | null;
    userid: number;
    stockid: number;

    static async validate(transaction: TransactionDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        const validDate = new Date(transaction.transactiontime);
        if (isNaN(validDate.getTime())) {
            isValid = false;
            wrongAttributes.push("transactiontime");
        }

        if (transaction.transactionvalue < 0) {
            isValid = false;
            wrongAttributes.push("transactionvalue");
        }

        if (!(await dbGetAllUserIDs()).includes(transaction.userid)) {
            isValid = false;
            wrongAttributes.push("userid");
        }

        if (!(await dbGetAllCarStockIDs()).includes(transaction.stockid)) {
            isValid = false;
            wrongAttributes.push("stockid");
        }

        return [isValid, wrongAttributes];
    }
}



