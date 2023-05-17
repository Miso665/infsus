import { QueryResult } from "pg"
import db from "./index"
import { ModelDTO } from "../models/model";

export async function dbGetAllModelIDs() {
    let results: QueryResult<{ modelid: number }> = await db.query("SELECT modelid FROM models;");
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.modelid))
    return IDs;
}

export async function dbGetModel(modelID: number): Promise<ModelDTO | null> {
    const query = "SELECT * FROM Model WHERE modelID = $1;";

    try {
        const result: QueryResult<ModelDTO> = await db.query(query, [modelID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error getting model:", error);
        return null;
    }
}

export async function dbUpdateModel(model: ModelDTO): Promise<boolean> {
    const query = "UPDATE Model SET modelName = $1, modelHorsepower = $2, modelTopSpeed = $3, modelTransmissionType = $4, modelAccelInseconds = $5, brandID = $6 WHERE modelID = $7;";

    try {
        await db.query(query, [
            model.modelname,
            model.modelhorsepower,
            model.modeltopspeed,
            model.modeltransmissiontype,
            model.modelaccelinseconds,
            model.brandid,
            model.modelid
        ]);
        return true;
    } catch (error) {
        console.error("Error updating model:", error);
        return false;
    }
}

export async function dbDeleteModel(modelID: number): Promise<boolean> {
    const query = "DELETE FROM Models WHERE modelID = $1 RETURNING modelID;";

    try {
        const result: QueryResult<{ modelid: number }> = await db.query(query, [modelID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting model:", error);
        return false;
    }
}