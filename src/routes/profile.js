const express = require('express')
const userAuth = require('../middlewares/userAuth')
const { validateProfileResponse } = require('../utils/validateSignUpDetails')

const profileRouter = express.Router()

profileRouter.get("/profile/view",userAuth, async(req, res) => {

    try {
        const user = req.user
        res.json(user)
    } catch(err) {
        res.status(400).send("Error" + err?.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res) => {
    try {
        if(!validateProfileResponse(req.body)) {
            throw new Error('User is not validated')
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
        console.log(loggedInUser, 'loggedIn User')

        const data = await loggedInUser.save()
        res.send({
            data: data,
            message: `${data.firstName} profile is updated`
        })
    } catch(err) {
        res.status(400).send('user cannot be updated')
    }

})

module.exports = profileRouter