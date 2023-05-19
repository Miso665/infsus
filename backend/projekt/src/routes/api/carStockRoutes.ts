import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { CarStockDTO } from '../../models/carStock';
import {
    dbInsertCarStock,
    dbGetCarStock,
    dbUpdateCarStock,
    dbDeleteCarStock,
    dbGetAllCarStocks,
} from '../../db/carStockDBAccess';
import { dbGetTestDrivesByStockID } from '../../db/testDriveDBAccess';

const router = express.Router();

router.get('/', async (req, res) => {
    const carStocks = await dbGetAllCarStocks();
    res.json(carStocks);
});

router.get('/:id(\\d+)', async (req, res) => {
    const id: number = Number(req.params.id);
    const carStock = await dbGetCarStock(id);
    if (carStock) {
        res.json(carStock);
    } else {
        res.sendStatus(404);
    }
});

router.get('/:id(\\d+)/testdrives', async (req, res) => {
    const id: number = Number(req.params.id);
    const carStock = await dbGetCarStock(id);
    const testDrives = await dbGetTestDrivesByStockID(id);
    if (carStock) {
        res.json(testDrives);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', jsonParser, async (req, res) => {
    let [valid, invalidFields] = await CarStockDTO.validate(req.body);
    if (valid) {
        let insertedCarStock = await dbInsertCarStock(req.body);
        res.json(insertedCarStock);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.put('/:id(\\d+)', jsonParser, async (req, res) => {
    let id: number = Number(req.params.id);
    let [valid, invalidFields] = await CarStockDTO.validate(req.body);

    if (valid) {
        req.body.stockid = id;
        let updateCarStock = await dbUpdateCarStock(req.body);
        res.json(updateCarStock);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.delete('/:id(\\d+)', async (req, res) => {
    const id: number = Number(req.params.id);
    const success = await dbDeleteCarStock(id);
    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.all("/:id(\\d+)", (req, res) => {
    res.sendStatus(501);
});

router.all("/", (req, res) => {
    res.sendStatus(501);
});

export = router;