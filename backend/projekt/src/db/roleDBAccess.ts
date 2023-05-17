import { QueryResult } from "pg"
import db from "./index"

export async function dbGetAllRoleIDs() {
    let results: QueryResult<{roleid: number}> = await db.query("SELECT roleID FROM roles;");
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.roleid))
    return IDs;
}


