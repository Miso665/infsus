import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { TransactionDTO } from '../../models/transaction';
import { dbGetAllTransactions, dbGetTransaction, dbInsertTransaction, dbUpdateTransaction, dbDeleteTransaction } from '../../db/transactionDBAccess';

const router = express.Router();

router.get("/", async (req, res) => {
    let transactions = await dbGetAllTransactions();

    res.json(transactions);
});

router.post("/", jsonParser, async (req, res) => {
    let [valid, invalidFields] = await TransactionDTO.validate(req.body);
    if (valid) {
        let transaction = await dbInsertTransaction(req.body);
        res.json({ transaction });
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.get("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let transaction = await dbGetTransaction(id);

    if (transaction != null) {
        res.json(transaction);
    } else {
        res.sendStatus(404);
    }
});

router.put("/:id(\\d+)", jsonParser, async (req, res) => {
    let id: number = Number(req.params.id);
    let [valid, invalidFields] = await TransactionDTO.validate(req.body);
    if (valid) {
        req.body.transactionid = id;
        let updatedTransaction = await dbUpdateTransaction(req.body);
        res.json(updatedTransaction);
    } else {
        res.status(400).json({ invalidFields, message: "There are missing or invalid fields." });
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id);
    let success = await dbDeleteTransaction(id);

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