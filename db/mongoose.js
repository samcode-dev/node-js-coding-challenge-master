const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const db = async() => {
    try {
        await mongoose.connect(process.env.mongoUri, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
      })

      console.log('database connected')
    } catch (error) {
        console.log(`could not connect. Error is ${error}`)
    }
}


db()



