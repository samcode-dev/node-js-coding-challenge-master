'use strict';

//****** Developed by Samuel Oluwatimileyin according to vien health instructions.******

// ***More info are iin the Readme.md file *****


const express = require('express');
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const dotent = require('dotenv')
Dotenv.config({path: './.env'})


const app = express();

// const port = process.env.PORT || 3000
const port = 2022

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(userRouter)

app.use("/", userRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


module.exports = app;
