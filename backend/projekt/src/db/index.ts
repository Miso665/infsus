import { Pool } from 'pg'

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ 
    user: process.env.DB_USER, 
    host:  process.env.DB_HOST, 
    database: 'cardealership', 
    password: process.env.DB_PASSWORD, 
    port: 5432, 
    ssl: true
})


export = pool