const validator = require('validator')

const ValidateSignUpDetails = (req) => {
    const {firstName, lastName, emailId, password} = req
    
    if(!firstName || !lastName) {
        throw new Error('Please enter firstname or lastname')
    } else if(!validator?.isEmail(emailId)) {
        throw new Error('Please enter a valid email')
    } else if(!validator?.isStrongPassword(password)) {
        throw new Error('Please enter a strong password')
    }
}

const validateProfileResponse = (req) => {
    const userKeysUpdateAllowed = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
    ]

   const isValidKey = Object.keys(req).every(Field => userKeysUpdateAllowed.includes(Field))
   return isValidKey
}

module.exports = {ValidateSignUpDetails, validateProfileResponse}