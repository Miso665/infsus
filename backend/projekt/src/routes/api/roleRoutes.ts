import express from 'express';
import { dbGetAllRoles, dbGetRole } from '../../db/roleDBAccess';

const router = express.Router()

router.get("/", async (req, res) => {
    let roles = await dbGetAllRoles()

    res.json(roles)
})


router.get("/:id(\\d+)", async (req, res) => {
    let id: number = Number(req.params.id)
    let role = await dbGetRole(id)

    if (role) {
        res.json(role)
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

export = router