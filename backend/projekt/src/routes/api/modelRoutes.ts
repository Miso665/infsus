import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { ModelDTO } from '../../models/model';
import { dbGetAllModels, dbGetModel, dbInsertModel, dbUpdateModel, dbDeleteModel } from '../../db/modelDBAccess';

const router = express.Router();

router.get("/", async (req, res) => {
    let models = await dbGetAllModels();

    res.json(models);
});


router.post("/", jsonParser, async (req, res) => {
    let [valid, invalidFields] = await ModelDTO.validate(req.body);
    if (valid) {
        let insertedModel = await dbInsertModel(req.body);
        res.json(insertedModel);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.get("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let model = await dbGetModel(id);

    if (model != null) {
        res.json(model);
    } else {
        res.sendStatus(404);
    }
});

router.put("/:id(\\d+)", jsonParser, async (req, res) => {
    let id: number = Number(req.params.id);
    let [valid, invalidFields] = await ModelDTO.validate(req.body);
    if (valid) {
        req.body.modelid = id;
        let updatedModel = await dbUpdateModel(req.body);
        res.json(updatedModel);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let success = await dbDeleteModel(id);

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