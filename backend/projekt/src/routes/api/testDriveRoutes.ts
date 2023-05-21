import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { TestDrive, TestDriveDTO } from '../../models/testDrive';
import { dbGetAllTestDrives, dbGetTestDrive, dbInsertTestDrive, dbUpdateTestDrive, dbDeleteTestDrive } from '../../db/testDriveDBAccess';
import { Brand } from '../../models/brand';
import { Model } from '../../models/model';
import { CarStock } from '../../models/carStock';
import { dbGetModel } from '../../db/modelDBAccess';
import { dbGetBrand } from '../../db/brandDBAccess';
import { dbGetCarStock } from '../../db/carStockDBAccess';
import { dbGetUser } from '../../db/userDBAccess';
import { dbGetRole } from '../../db/roleDBAccess';
import { Role } from '../../models/role';
import { User } from '../../models/user';

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

router.get("/deepaccess/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    const testDrive = await dbGetTestDrive(id);

    if (testDrive != null) {

        const stockID = testDrive.stockid
        const carStock = await dbGetCarStock(stockID);
        const modeID = carStock.modelid;
        const model = await dbGetModel(modeID);
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

        let carStockInstance: CarStock = {
            stockID: carStock.stockid,
            stockPrice: carStock.stockprice,
            stockColor: carStock.stockcolor,
            stockRims: carStock.stockrims,
            stockBought: carStock.stockbought,
            model: modelInstance
        }


        let userID = testDrive.userid;
        const user = await dbGetUser(userID);
        let roleID = user.roleid;
        const role = await dbGetRole(roleID);

        let roleInstance: Role = {
            roleID: role.roleid,
            roleName: role.rolename,
            roleAccessLevel: role.roleaccesslevel
        }

        let userInstance: User = {
            userID: user.userid,
            userName: user.username,
            userSurname: user.usersurname,
            OIB: user.oib,
            role: roleInstance
        }

        let testDriveInstance: TestDrive = {
            testDriveID: testDrive.testdriveid,
            testDriveTime: new Date (testDrive.testdrivetime),
            testDriveConcluded: testDrive.testdriveconcluded,
            user: userInstance,
            stock: carStockInstance
        }

        res.json(testDriveInstance);
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