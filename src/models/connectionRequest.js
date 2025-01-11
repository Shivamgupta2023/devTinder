const mongoose = require('mongoose')

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // reference to User model
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['interested', 'ignored', 'accepted', 'rejected'],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    timeStamps: true
})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('You cannont send request to yourself!')
    }
    next()
})

const connectionRequestModel = mongoose.model('connectionRequest', connectionRequestSchema)

module.exports = connectionRequestModel