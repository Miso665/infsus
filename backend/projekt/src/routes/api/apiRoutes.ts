import express from 'express';

const router = express.Router();

import roleAPI from "./roleRoutes"
router.use("/roles", roleAPI)

import userAPI from "./userRoutes"
router.use("/users", userAPI);

import transactionAPI from "./transactionRoutes"
router.use("/transactions", transactionAPI);

import testDriveAPI from "./testDriveRoutes"
router.use("/testdrives", testDriveAPI);

import modelAPI from "./modelRoutes"
router.use("/models", modelAPI);

import carStockAPI from "./carStockRoutes"
router.use("/carstocks", carStockAPI);

import brandAPI from "./brandRoutes"
router.use("/brands", brandAPI);


export = router;