const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserAuth = async(req, res, next) => {
    try {
        const cookies = req.cookies
        const {token} = cookies
        if(!token) {
            return res.status(401).send('Please login!')
        }

        const decodedMessage = await jwt.verify(token, "DevTinder@#123")

        const {_id} = decodedMessage
        const data = await User.findById(_id)
        if(!data) {
            throw new Error("user Not found")
        }
        req.user = data
        next()
    } catch(err) {
        res.status(400).send('User cannot be Authenticated')
    }
}

module.exports = UserAuth