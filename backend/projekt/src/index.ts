import express from 'express';
import { QueryResult } from 'pg';
var cors = require('cors');

const app = express();
const port = 8080;

import db from "./db";
import { dbGetBrand } from './db/brandDBAccess';
import { BrandDTO } from './models/brand';
import { dbGetAllModels } from './db/modelDBAccess';

app.set('json spaces', 2)
app.use(cors());
import apiRoutes from "./routes/api/apiRoutes";
app.use("/api", apiRoutes);

import homeRoutes from "./routes/appRoutes/homeRoutes";
app.use("/", homeRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});