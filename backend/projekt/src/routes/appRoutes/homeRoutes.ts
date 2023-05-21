import express from 'express';
const fs = require('fs');
const path = require('path');



const router = express.Router()



router.get("/", async (req, res) => {
    fs.readFile('src/public/api.json', function (err, data) {
        if (!err) {
            const jsonData = JSON.parse(data);
            res.json(jsonData)
        } else {
            console.log(err);
        }
    })
})

router.all("/", (req, res) => {
    res.sendStatus(501)
})

export = router