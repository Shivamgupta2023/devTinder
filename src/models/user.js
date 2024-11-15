const mongoose = require('mongoose')
const validator = require('validator')

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

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

userSchema.methods.getJWT = async function () {
    let user = this
    const token = await jwt.sign({ _id: user._id }, "DevTinder@#123", {expiresIn: '1d'})
    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this
    const passwordHash = user.password
    const correctPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return correctPassword;
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel