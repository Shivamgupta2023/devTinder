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

connectDB().then(() => {
    console.log('database is connected')
    app.listen(7777, () => {
        console.log('server is running successfully')
    })
}).catch((err) => {
    console.error('database cannot be connected')
})