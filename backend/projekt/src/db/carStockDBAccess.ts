import { QueryResult } from "pg"
import db from "./index"
import { CarStockDTO } from "../models/carStock";

export async function dbGetAllCarStockIDs() {
    let results: QueryResult<{ stockid: number }> = await db.query("SELECT stockID FROM CarStock;");
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.stockid))
    return IDs;
}

export async function dbInsertCarStock(carStock: CarStockDTO): Promise<CarStockDTO | null> {
    const query =
        "INSERT INTO CarStock (stockPrice, stockColor, stockRims, stockBought, modelID) VALUES ($1, $2, $3, $4, $5) RETURNING *;";

    try {
        const result: QueryResult<CarStockDTO> = await db.query(query, [
            carStock.stockprice,
            carStock.stockcolor,
            carStock.stockrims,
            carStock.stockbought,
            carStock.modelid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting car stock:", error);
        return null;
    }
}

export async function dbGetCarStock(stockID: number): Promise<CarStockDTO | null> {
    const query = "SELECT * FROM CarStock WHERE stockID = $1;";

    try {
        const result: QueryResult<CarStockDTO> = await db.query(query, [stockID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error retrieving car stock:", error);
        return null;
    }
}

export async function dbUpdateCarStock(carStock: CarStockDTO): Promise<CarStockDTO> {
    const query =
        "UPDATE CarStock SET stockPrice = $1, stockColor = $2, stockRims = $3, stockBought = $4, modelID = $5 WHERE stockID = $6 RETURNING *;";

    try {
        const result: QueryResult<CarStockDTO> = await db.query(query, [
            carStock.stockprice,
            carStock.stockcolor,
            carStock.stockrims,
            carStock.stockbought,
            carStock.modelid,
            carStock.stockid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating car stock:", error);
        return null;
    }
}

export async function dbDeleteCarStock(stockID: number): Promise<boolean> {
    const query = "DELETE FROM CarStock WHERE stockID = $1 RETURNING stockID;";

    try {
        const result: QueryResult<{ stockid: number }> = await db.query(query, [stockID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting car stock:", error);
        return false;
    }
}

export async function dbGetAllCarStocks(): Promise<CarStockDTO[]> {
    const query = "SELECT * FROM CarStock;";
    try {
        const result: QueryResult<CarStockDTO> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error getting all carstock:", error);
        return [];
    }
}