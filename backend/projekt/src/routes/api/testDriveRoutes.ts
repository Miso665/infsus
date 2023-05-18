import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { TestDriveDTO } from '../../models/testDrive';
import { dbGetAllTestDrives, dbGetTestDrive, dbInsertTestDrive, dbUpdateTestDrive, dbDeleteTestDrive } from '../../db/testDriveDBAccess';

const router = express.Router();

router.get("/", async (req, res) => {
    let testDrives = await dbGetAllTestDrives();

    res.json(testDrives);
});

router.post("/", jsonParser, async (req, res) => {
    let [valid, invalidFields] = await TestDriveDTO.validate(req.body);
    if (valid) {
        let insertedTestDrive = await dbInsertTestDrive(req.body);
        res.json(insertedTestDrive);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.get("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let testDrive = await dbGetTestDrive(id);

    if (testDrive != null) {
        res.json(testDrive);
    } else {
        res.sendStatus(404);
    }
});

router.put("/:id(\\d+)", jsonParser, async (req, res) => {
    let id: number = Number(req.params.id);
    let [valid, invalidFields] = await TestDriveDTO.validate(req.body);
    if (valid) {
        req.body.testdriveid = id;
        let updatedTestDrive = await dbUpdateTestDrive(req.body);
        res.json(updatedTestDrive);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let success = await dbDeleteTestDrive(id);

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