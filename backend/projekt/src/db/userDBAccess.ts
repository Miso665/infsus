import { QueryResult } from "pg"
import db from "./index"
import { UserDTO } from "../models/user";

export async function dbGetAllUserIDs() {
    let results: QueryResult<{ userid: number }> = await db.query("SELECT userID FROM Users;");
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.userid))
    return IDs;
}


export async function dbInsertUser(user: UserDTO): Promise<UserDTO | null> {
    const query =
        "INSERT INTO Users (userName, userSurname, OIB, roleID) VALUES ($1, $2, $3, $4) RETURNING *;";

    try {
        const result: QueryResult<UserDTO> = await db.query(query, [
            user.username,
            user.usersurname,
            user.oib,
            user.roleid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting user:", error);
        return null;
    }
}

export async function dbGetUser(userID: number): Promise<UserDTO | null> {
    const query = "SELECT * FROM Users WHERE userID = $1;";

    try {
        const result: QueryResult<UserDTO> = await db.query(query, [userID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

export async function dbUpdateUser(user: UserDTO): Promise<UserDTO> {
    const query =
        "UPDATE Users SET userName = $1, userSurname = $2, OIB = $3, roleID = $4 WHERE userID = $5 RETURNING *;";

    try {
        const result: QueryResult<UserDTO> = await db.query(query, [user.username, user.usersurname, user.oib, user.roleid, user.userid]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}

export async function dbDeleteUser(userID: number): Promise<boolean> {
    const query = "DELETE FROM Users WHERE userID = $1 RETURNING userID;";

    try {
        const result: QueryResult<{ userid: number }> = await db.query(query, [userID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
}

export async function dbGetAllUsers(): Promise<UserDTO[]> {
    const query = "SELECT * FROM Users;";
    try {
        const result: QueryResult<UserDTO> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error getting all users:", error);
        return [];
    }
}

export async function dbCheckOIBExists(OIB: string): Promise<boolean> {
    const query = "SELECT * FROM Users WHERE OIB = $1;";
    try {
        const result: QueryResult<{ count: number }> = await db.query(query, [OIB]);
        return result.rows.length > 0;
    } catch (error) {
        console.error("Error checking OIB existence:", error);
        return false;
    }
}