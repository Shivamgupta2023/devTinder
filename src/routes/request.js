const express = require('express')

const userAuth = require('../middlewares/userAuth')

const ConnectionRequest = require('../models/connectionRequest')

const User = require('../models/user');

const requestRouter = express.Router()

requestRouter.post("/request/sent/:status/:toUserId", userAuth, async(req, res) => {
    try {

        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ['interested', 'ignored']
        let isValidRequest = await allowedStatus.includes(status)
        if(!isValidRequest) {
            return res.status(400).json({message: 'request is not valid'})
        }

        const toUser = await User.findById(toUserId)
        if(!toUser) {
           return res.status(400).json({
            message: 'User not found'
           })
        }

        const existingConnection = await ConnectionRequest.findOne(
            {$or : [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]}
        )
        if(existingConnection) {
            return res.status(400).json({message: 'request already send'})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save()

        res.json({
            message: 'Connection request send successfully',
            data
        })

    } catch(err){
        res.status(400).send('Cannot send connection request')
    }
})

requestRouter.post('/request/review/:status/:requestId',
    userAuth,
    async(req, res) => {

        try {

            const loginUser = req.user
            const {requestId, status} = req.params
    
            const allowedStatus = ['accepted', 'rejected']
            if(!allowedStatus.includes(status)) {
                return res.status(400).json({
                    message: 'Status not found'
                })
            }
    
            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loginUser._id,
                status: "interested"
    
            })
    
            if(!connectionRequest) {
                return res.status(400).json({
                    message: 'Connection is not found'
                })
            }
    
            connectionRequest.status = status
    
            const data = await connectionRequest.save()

            res.json({
                message: 'Connection request is' + status, data
            })

        } catch(err) {
            
            res.status(400).send('Error', + err.message)
        }
    }
)

module.exports = requestRouter