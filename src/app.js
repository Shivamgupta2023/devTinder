const express = require('express');
const connectDB = require('./config/database');

const app = express();
const User = require('./models/user');

const ValidateSignUpDetails = require('./utils/validateSignUpDetails')
const bcrypt = require('bcrypt');

// middleware to convert to json by express
app.use(express.json())

const saltRounds = 10;

app.post('/signup', async (req, res) => {

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

app.post('/login', async (req,res) => {
    try {
        const {emailId, password} = req.body

        const user = await User.findOne({emailId: emailId})
        if(!user) {
            throw new Error('User Not found')
        } 
        let correctPassword = bcrypt.compare(password, user.password);
        if (correctPassword) {
          res.send("user login is successfull");
        } else {
          throw new Error("Password is not correct");
        }
    } catch (err) {
        res.status(400).send('Error:' + err?.message)
    }
})

app.get('/user', async(req, res) => {
    const email = req.body.emailId
    try {
        const data = await User.find({emailId: email})
        res.send('data is found by email')
    } catch (err){
        res.status(400).send('error connecting to database' + err?.message)
    }
})

app.get('/feed', async(req, res) => {
    try {
        const data = await User.find({})
        res.send('all feed data is shown')
    } catch (err){
        res.status(400).send('error connecting to database' + err?.message)
    }
})

app.delete('/user' , async(req, res) => {
    const userId = req.body.userId
    try {
        const data = await User.findByIdAndDelete(userId)
        res.send('data after deletion')
    } catch {
        res.status(400).send('error connecting to database' + err?.message)
    }
})

app.patch('/user/:userId' , async(req, res) => {
    const userId = req.params?.userId
    const Data = req.body
    try {
        const notToBeUpdatedKeys = ['emailId', 'password'];
        if(Object.keys(Data).every(ele => notToBeUpdatedKeys.includes(ele))) {
            res.status(400).send('This data cannot be updates')
        }
        const data = await User.findByIdAndUpdate({_id: userId}, Data, {
            runValidators: true
        })
        res.send('data after updation')
    } catch {
        res.status(400).send('error connecting to database')
    }
})

connectDB().then(() => {
    app.listen(7777, () => {
        console.log('server is running successfully')
    })
}).catch((err) => {
    console.error('database cannot be connected')
})