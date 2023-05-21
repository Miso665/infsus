import { QueryResult } from "pg"
import db from "./index"
import { RoleDTO } from "../models/role";

export async function dbGetAllRoleIDs() {
    let results: QueryResult<{ roleid: number }> = await db.query("SELECT roleID FROM roles;");
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.roleid))
    return IDs;
}

export async function dbGetRole(roleID: number): Promise<RoleDTO | null> {
    const query = 'SELECT * FROM roles WHERE roleid = $1;';
    const values = [roleID];

    try {
        const result: QueryResult<RoleDTO> = await db.query(query, values);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving role by ID:', error);
        return null;
    }
}

export async function dbGetAllRoles(): Promise<RoleDTO[]> {
    const query = "SELECT * FROM Roles;";

    try {
        const result: QueryResult<RoleDTO> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error getting all roles:", error);
        return [];
    }
}
