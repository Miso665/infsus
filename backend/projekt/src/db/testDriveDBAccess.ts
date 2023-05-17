import { QueryResult } from "pg";
import db from "./index";
import { TestDriveDTO } from "../models/testDrive";

export async function dbInsertTestDrive(testDrive: TestDriveDTO): Promise<number | null> {
    const query =
        "INSERT INTO TestDrives (testDriveTime, testDriveConcluded, userID, stockID) VALUES ($1, $2, $3, $4) RETURNING testDriveID;";

    try {
        const result: QueryResult<{ testdriveid: number }> = await db.query(query, [
            testDrive.testdrivetime,
            testDrive.testdriveconcluded,
            testDrive.userid,
            testDrive.stockid,
        ]);
        return result.rows[0].testdriveid;
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

export async function dbUpdateTestDrive(testDrive: TestDriveDTO): Promise<boolean> {
    const query = "UPDATE TestDrives SET testDriveTime = $1, testDriveConcluded = $2 WHERE testDriveID = $3;";

    try {
        await db.query(query, [testDrive.testdrivetime, testDrive.testdriveconcluded, testDrive.testdriveid]);
        return true;
    } catch (error) {
        console.error("Error updating test drive:", error);
        return false;
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