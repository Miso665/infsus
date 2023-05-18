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

    static async validate(transaction): Promise<[boolean, string[]]> {
        let isValid = true;
        let wrongAttributes: string[] = [];

        if (!transaction.transactiontime) {
            isValid = false;
            wrongAttributes.push("transactiontime");
        } else {
            const validDate = new Date(transaction.transactiontime);
            if (isNaN(validDate.getTime())) {
                isValid = false;
                wrongAttributes.push("transactiontime");
            }
        }

        if (!transaction.transactionvalue || transaction.transactionvalue < 0) {
            isValid = false;
            wrongAttributes.push("transactionvalue");
        }

        if (!transaction.userid || !(await dbGetAllUserIDs()).includes(transaction.userid)) {
            isValid = false;
            wrongAttributes.push("userid");
        }

        if (!transaction.stockid || !(await dbGetAllCarStockIDs()).includes(transaction.stockid)) {
            isValid = false;
            wrongAttributes.push("stockid");
        }

        return [isValid, wrongAttributes];
    }
}



