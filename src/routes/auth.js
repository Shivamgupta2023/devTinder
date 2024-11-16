const express = require('express')
const ValidateSignUpDetails = require('../utils/validateSignUpDetails')

const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router()

const saltRounds = 10

authRouter.post('/signup', async (req, res) => {

    try {

        const {firstName, lastName, emailId, password} = req.body
        ValidateSignUpDetails(req.body)
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save()
        res.send('data is saved')
    }
    catch (err){
        res.status(400).send('Error' + err?.message)
    }
})

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User Not found");
    }

    let correctPassword = await user.validatePassword(password)
    if (correctPassword) {
      // set token  
      let token = await user.getJWT();
      res.cookie("token", token);
      res.send("user login is successfull");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    res.status(400).send("Error:" + err?.message);
  }
});

authRouter.post("/logout", async(req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
  res.send()
})

module.exports = authRouter