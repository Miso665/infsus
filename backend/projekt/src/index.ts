import express from 'express';
import { QueryResult } from 'pg';


const app = express();
const port = 8080;

import db from "./db";
import { dbGetBrand } from './db/brandDBAccess';
import { BrandDTO } from './models/brand';
import { dbGetAllModels } from './db/modelDBAccess';


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 1);

  // Pass to next layer of middleware
  next();
});


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