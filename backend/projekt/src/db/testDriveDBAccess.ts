import { QueryResult } from "pg";
import db from "./index";
import { TestDriveDTO } from "../models/testDrive";

export async function dbInsertTestDrive(testDrive: TestDriveDTO): Promise<TestDriveDTO | null> {
    const query =
        "INSERT INTO TestDrives (testDriveTime, testDriveConcluded, userID, stockID) VALUES ($1, $2, $3, $4) RETURNING *;";

    try {
        const result: QueryResult<TestDriveDTO> = await db.query(query, [
            testDrive.testdrivetime,
            testDrive.testdriveconcluded,
            testDrive.userid,
            testDrive.stockid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting test drive:", error);
        return null;
    }
}

export async function dbGetTestDrive(testDriveID: number): Promise<TestDriveDTO | null> {
    const query = "SELECT * FROM TestDrives WHERE testDriveID = $1;";

    try {
        const result: QueryResult<TestDriveDTO> = await db.query(query, [testDriveID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error getting test drive:", error);
        return null;
    }
}

export async function dbUpdateTestDrive(testDrive: TestDriveDTO): Promise<TestDriveDTO> {
    const query = "UPDATE TestDrives SET testDriveTime = $1, testDriveConcluded = $2 WHERE testDriveID = $3 RETURNING *;";

    try {
        const result: QueryResult<TestDriveDTO> = await db.query(query, [testDrive.testdrivetime, testDrive.testdriveconcluded, testDrive.testdriveid]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating test drive:", error);
        return null;
    }
}

export async function dbDeleteTestDrive(testDriveID: number): Promise<boolean> {
    const query = "DELETE FROM TestDrives WHERE testDriveID = $1 RETURNING testDriveID;";

    try {
        const result: QueryResult<{ testdriveid: number }> = await db.query(query, [testDriveID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting test drive:", error);
        return false;
    }
}

export async function dbGetAllTestDrives(): Promise<TestDriveDTO[]> {
    const query = "SELECT * FROM TestDrives;";
    try {
        const result: QueryResult<TestDriveDTO> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error getting all testdrives:", error);
        return [];
    }
}


export async function concludeTestDriveConcluded(testDriveID: number): Promise<boolean> {
    const query = "UPDATE TestDrives SET testDriveConcluded = true WHERE testDriveID = $1;";

    try {
        const result: QueryResult = await db.query(query, [testDriveID]);
        return result.rowCount > 0; // Returns true if at least one row is affected
    } catch (error) {
        console.error("Error updating test drive:", error);
        return false;
    }
}

export async function doesTestDriveExist(userId: number, stockId: number, testDriveTime: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) AS count FROM testdrives WHERE userid = $1 AND stockid = $2 AND testdrivetime = $3;';
    const values = [userId, stockId, testDriveTime];

    try {
        const result: QueryResult<{ count: number }> = await db.query(query, values);
        const count = result.rows[0].count;
        return count > 0;
    } catch (error) {
        console.error('Error checking if test drive exists:', error);
        return false;
    }
}