import express from 'express';
import { QueryResult } from 'pg';


const app = express();
const port = 8080;

import db from "./db";
import { dbGetBrand } from './db/brandDBAccess';
import { BrandDTO } from './models/brand';


app.get('/', async (req, res) => {
    let result: QueryResult<any> =
            await db.query(`SELECT *
            FROM public.carstock
            WHERE stockid = 3;`)
  res.json(result.rows);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});