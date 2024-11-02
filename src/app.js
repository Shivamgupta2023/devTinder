const express = require('express');

const app = express();

app.use('/test', (req, res) => {
    res.send('hello from the server')
})

app.listen(7777, () => {
    console.log('server is running successfully')
})