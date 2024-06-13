const express = require("express")
const app = express()
app.use(express.json())

const PORT=7000

const DB = require('./db/connect')

const router = require('./routes/index')
app.use('/api',router)

const start = async()=>{
    try{
        await DB.authenticate()
        await DB.sync()
        app.listen(PORT,()=> console.log(`Server start on ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}
start()
module.exports = DB

