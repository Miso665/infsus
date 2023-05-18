import express from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
import { UserDTO } from '../../models/user';
import { dbDeleteUser, dbGetAllUsers, dbGetUser, dbInsertUser, dbUpdateUser } from '../../db/userDBAccess';

const router = express.Router()

router.get("/", async (req, res) => {
    let users = await dbGetAllUsers()

    res.json(users)
})

router.post("/", jsonParser, async (req, res) => {
    let [valid, invalidFields] = await UserDTO.validate(req.body);
    if (valid) {
        let user = await dbInsertUser(req.body)
        res.json(user)
    }
    else {
        res.status(400).json({invalidFields: invalidFields, message: "There are missing or invalid fields."})
    }
})

router.get("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id)
    let user = await dbGetUser(id)

    if (user != null) {
        res.json(user)
    }
    else {
        res.sendStatus(404)
    }
})

router.put("/:id(\\d+)", jsonParser, async (req, res) => {
    let id: number = Number(req.params.id)
    let [valid, invalidFields] = await UserDTO.validate(req.body);
    if (valid) {
        req.body.userid = id
        let user = await dbUpdateUser(req.body)
        res.json(user)
    }
    else {
        res.status(400).json({invalidFields: invalidFields, message: "There are missing or invalid fields."})
    }
})

router.delete("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id)
    let success = await dbDeleteUser(id)

    if (success) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(404)
    }
})

router.all("/:id(\\d+)", (req, res) => {
    res.sendStatus(501)
})

router.all("/", (req, res) => {
    res.sendStatus(501)
})


export = router;