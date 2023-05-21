import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { Model, ModelDTO } from '../../models/model';
import { dbGetAllModels, dbGetModel, dbInsertModel, dbUpdateModel, dbDeleteModel } from '../../db/modelDBAccess';
import { dbGetBrand } from '../../db/brandDBAccess';
import { Brand } from '../../models/brand';

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


router.get("/deepaccess/:id(\\d+)", async (req, res) => {
    const id: number = Number(req.params.id);
    const model = await dbGetModel(id);

    if (model) {

        const brandID = model.brandid;
        const brand = await dbGetBrand(brandID);

        let brandInstance: Brand = {
            brandID: brand.brandid,
            brandName: brand.brandname,
            brandContractStart: new Date(brand.brandcontractstart),
            brandContractEnd: new Date(brand.brandcontractend)
        };

        let modelInstance: Model = {
            modelID: model.modelid,
            modelName: model.modelname,
            modelHorsePower: model.modelhorsepower,
            modelTopSpeed: model.modeltopspeed,
            modelTransmissionType: model.modeltransmissiontype,
            modelAccelInSeconds: model.modelaccelinseconds,
            brand: brandInstance
        }

        res.json(modelInstance);
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