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


// app.get('/user', async(req, res) => {
//     const email = req.body.emailId
//     try {
//         const data = await User.find({emailId: email})
//         res.send('data is found by email')
//     } catch (err){
//         res.status(400).send('error connecting to database' + err?.message)
//     }
// })

// app.get('/feed', async(req, res) => {
//     try {
//         const data = await User.find({})
//         res.send('all feed data is shown')
//     } catch (err){
//         res.status(400).send('error connecting to database' + err?.message)
//     }
// })

// app.delete('/user' , async(req, res) => {
//     const userId = req.body.userId
//     try {
//         const data = await User.findByIdAndDelete(userId)
//         res.send('data after deletion')
//     } catch {
//         res.status(400).send('error connecting to database' + err?.message)
//     }
// })

// app.patch('/user/:userId' , async(req, res) => {
//     const userId = req.params?.userId
//     const Data = req.body
//     try {
//         const notToBeUpdatedKeys = ['emailId', 'password'];
//         if(Object.keys(Data).every(ele => notToBeUpdatedKeys.includes(ele))) {
//             res.status(400).send('This data cannot be updates')
//         }
//         const data = await User.findByIdAndUpdate({_id: userId}, Data, {
//             runValidators: true
//         })
//         res.send('data after updation')
//     } catch {
//         res.status(400).send('error connecting to database')
//     }
// })

connectDB().then(() => {
    app.listen(7777, () => {
        console.log('server is running successfully')
    })
}).catch((err) => {
    console.error('database cannot be connected')
})