const express = require('express')
const userRouter = express.Router()

const userAuth = require('../middlewares/userAuth')

const ConnectionRequest = require('../models/connectionRequest')

const User_Fetch_Data = "firstName lastName age gender photoUrl about skills"

userRouter.get('/user/request/recieved', userAuth, async(req, res) => {

    try {
        const loggedInUserId = req.user._id;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: 'interested'
        }).populate("fromUserId", User_Fetch_Data)

        res.json({
            message: 'Data fetched Successfully',
            data: connectionRequests
        })

    } catch(err) {
        res.status(400).send('Error:' + err.message)
    }
})

userRouter.get('/user/connections', userAuth, async(req,res) => {

    try{

        const loggedInUserId = req.user._id;

        const connectionRequests = await ConnectionRequest.find(
            {$or : [
                {toUserId: loggedInUserId, status: 'accepted'},
                {fromUserId: loggedInUserId, status: 'accepted'}
            ]}
        )
        .populate("fromUserId", User_Fetch_Data)
        .populate("toUserId", User_Fetch_Data)

        const data = connectionRequests.map(row => {
            if(row.fromUserId._id.toString() === loggedInUserId._id) {
                return row.toUserId
            }
            return row.fromUserId;
        })

        res.json({data})

    } catch(err) {
        res.status(400).send('Error' + err.message)
    }
})

module.exports = userRouter