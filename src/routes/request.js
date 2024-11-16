const express = require('express')

const userAuth = require('../middlewares/userAuth')

const requestRouter = express.Router()

requestRouter.post("/sentConnectionRequest", userAuth, async(req, res) => {
    try {
        const user = req.user
        res.send(user.firstName + " " + "sent the request");
    } catch(err){
        res.status(400).send('Cannot send connection request')
    }
})

module.exports = requestRouter