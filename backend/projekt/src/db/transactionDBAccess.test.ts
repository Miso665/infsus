import { TransactionDTO } from "../models/transaction";
import { dbInsertTransaction } from "./transactionDBAccess";

test('IDs must be 1, 2, 3', async () => {
    const transaction: TransactionDTO = {
        transactiontime: "2023-05-18 10:30:00", // Example transaction time in string format
        transactionvalue: 100, // Example transaction value
        transactionid: null, // Transaction ID will be assigned by the database
        userid: 1, // Example user ID
        stockid: 2, // Example stock ID
    };

    expect(await dbInsertTransaction(transaction)).toBe(4);
});