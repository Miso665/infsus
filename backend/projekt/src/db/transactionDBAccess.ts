import { QueryResult } from "pg";
import db from "./index";
import { TransactionDTO } from "../models/transaction";

export async function dbInsertTransaction(transaction: TransactionDTO): Promise<TransactionDTO | null> {
    const query =
        "INSERT INTO Transactions (transactionTime, transactionValue, userID, stockID) VALUES ($1, $2, $3, $4) RETURNING *;";

    try {
        const result: QueryResult<TransactionDTO> = await db.query(query, [
            transaction.transactiontime,
            transaction.transactionvalue,
            transaction.userid,
            transaction.stockid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting transaction:", error);
        return null;
    }
}

export async function dbGetTransaction(transactionID: number): Promise<TransactionDTO | null> {
    const query = "SELECT * FROM Transactions WHERE transactionID = $1;";

    try {
        const result: QueryResult<TransactionDTO> = await db.query(query, [transactionID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error getting transaction:", error);
        return null;
    }
}

export async function dbUpdateTransaction(transaction: TransactionDTO): Promise<TransactionDTO> {

    const query =
        "UPDATE Transactions SET transactionTime = $1, transactionValue = $2 WHERE transactionID = $3 RETURNING *;";

    try {
        const result: QueryResult<TransactionDTO> = await db.query(query, [transaction.transactiontime, transaction.transactionvalue, transaction.transactionid]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating transaction:", error);
        return null;
    }
}

export async function dbDeleteTransaction(transactionID: number): Promise<boolean> {
    const query = "DELETE FROM Transactions WHERE transactionID = $1 RETURNING transactionID;";

    try {
        const result: QueryResult<{ transactionid: number }> = await db.query(query, [transactionID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return false;
    }
}

export async function dbGetAllTransactions(): Promise<TransactionDTO[]> {
    const query = "SELECT * FROM Transactions;";
    try {
        const result: QueryResult<TransactionDTO> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error getting all transactions:", error);
        return [];
    }
  }