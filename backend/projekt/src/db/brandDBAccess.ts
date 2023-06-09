import { QueryResult } from "pg"
import { BrandDTO } from "../models/brand";
import db from "./index"

export async function dbInsertBrand(brand: BrandDTO): Promise<BrandDTO | null> {
    const query =
        "INSERT INTO Brand (brandName, brandContractStart, brandContractEnd) VALUES ($1, $2, $3) RETURNING *;";

    try {
        const result: QueryResult<BrandDTO> = await db.query(query, [
            brand.brandname,
            brand.brandcontractstart,
            brand.brandcontractend,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting brand:", error);
        return null;
    }
}

export async function dbGetBrand(brandID: number): Promise<BrandDTO | null> {
    const query = "SELECT * FROM Brand WHERE brandID = $1;";

    try {
        const result: QueryResult<BrandDTO> = await db.query(query, [brandID]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error getting brand:", error);
        return null;
    }
}

export async function dbUpdateBrand(brand: BrandDTO): Promise<BrandDTO> {
    const query =
        "UPDATE Brand SET brandName = $1, brandContractStart = $2, brandContractEnd = $3 WHERE brandID = $4 RETURNING *;";

    try {
        const result: QueryResult<BrandDTO> = await db.query(query, [
            brand.brandname,
            brand.brandcontractstart,
            brand.brandcontractend,
            brand.brandid,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating brand:", error);
        return null;
    }
}

export async function dbDeleteBrand(brandID: number): Promise<boolean> {
    const query = "DELETE FROM Brand WHERE brandID = $1 RETURNING brandID;";

    try {
        const result: QueryResult<{ brandid: number }> = await db.query(query, [brandID]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting brand:", error);
        return false;
    }
}

export async function dbGetAllBrandIDs() {
    const query = "SELECT brandid FROM brand;";

    let results: QueryResult<{ brandid: number }> = await db.query(query);
    let IDs: number[] = [];
    results.rows.forEach(value => IDs.push(value.brandid))
    return IDs;
}

export async function dbGetAllBrands(): Promise<BrandDTO[]> {
    const query = "SELECT * FROM Brand;";
  
    try {
      const result: QueryResult<BrandDTO> = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error getting all brands:", error);
      return [];
    }
  }
  