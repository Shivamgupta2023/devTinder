const express = require('express');
const connectDB = require('./config/database');

const app = express();

const cookieParser = require('cookie-parser')

// middleware to convert to json by express
app.use(express.json())
app.use(cookieParser())


const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

connectDB().then(() => {
    app.listen(7777, () => {
        console.log('server is running successfully')
    })
}).catch((err) => {
    console.error('database cannot be connected')
})