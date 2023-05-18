import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { BrandDTO } from '../../models/brand';
import {
    dbInsertBrand,
    dbGetBrand,
    dbUpdateBrand,
    dbDeleteBrand,
    dbGetAllBrands,
} from '../../db/brandDBAccess';

const router = express.Router();

router.get('/', async (req, res) => {
    const brands = await dbGetAllBrands();
    res.json(brands);
});

router.get('/:id(\\d+)', async (req, res) => {
    const id: number = Number(req.params.id);
    const brand = await dbGetBrand(id);
    if (brand) {
        res.json(brand);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', jsonParser, async (req, res) => {
    let [valid, invalidFields] = await BrandDTO.validate(req.body);
    if (valid) {
        let insertedBrand = await dbInsertBrand(req.body);
        res.json(insertedBrand);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.put('/:id(\\d+)', jsonParser, async (req, res) => {
    let id: number = Number(req.params.id);
    let [valid, invalidFields] = await BrandDTO.validate(req.body);

    if (valid) {
        req.body.brandid = id;
        let updateBrand = await dbUpdateBrand(req.body);
        res.json(updateBrand);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.delete('/:id(\\d+)', async (req, res) => {
    const id: number = Number(req.params.id);
    const success = await dbDeleteBrand(id);
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