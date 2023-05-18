import express from 'express';
import { QueryResult } from 'pg';


const app = express();
const port = 8080;

import db from "./db";
import { dbGetBrand } from './db/brandDBAccess';
import { BrandDTO } from './models/brand';
import { dbGetAllModels } from './db/modelDBAccess';

import apiRoutes from "./routes/api/apiRoutes";
app.use("/api", apiRoutes);

app.get('/', async (req, res) => {
    console.log(await dbGetAllModels())

    let result: QueryResult<any> =
            await db.query(`SELECT *
            FROM public.carstock
            WHERE stockid = 3;`)
  res.json(result.rows);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});