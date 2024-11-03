const express = require('express');
const connectDB = require('./config/database');

const app = express();
const User = require('./models/user')

// middleware to convert to json by express
app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send('data is saved')
    }
    catch (err){
        res.status(400).send('error connecting to database' + err?.message)
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

app.patch('/user' , async(req, res) => {
    const userId = req.body.userId
    const Data = req.body
    try {
        const data = await User.findByIdAndUpdate(userId, Data)
        console.log('@@@', data)
        res.send('data after updation')
    } catch {
        res.status(400).send('error connecting to database' + err?.message)
    }
})

connectDB().then(() => {
    console.log('database is connected')
    app.listen(7777, () => {
        console.log('server is running successfully')
    })
}).catch((err) => {
    console.error('database cannot be connected')
})