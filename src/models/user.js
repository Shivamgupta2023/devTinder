const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        minLength: 3
    },
    emailId: {
        type: String,
        required: true,
        minLength: 10,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 10,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Please enter a strong password')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'others'].includes(value)) {
                throw new Error('Gender is not valid')
            }
        }
    }, 
    photoUrl: {
        type: String
    },
    about: {
        type: String,
        minLength: 10,
        default: 'this is about my profile'
    },
    skills: {
        type: [String]
    }
},
{ timestamps: true })

const userModel = mongoose.model('user', userSchema)

module.exports = userModel