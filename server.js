if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname+ '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser : true
})

const db = mongoose.connection
db.on('error', error => console.log(error)) // if error occures on conection
db.once('open' , () => console.log('connected to Mongoose'))//runns once for checking the established connectiom

app.use('/',indexRouter)
// process.env.PORT is pory of the hosting platform elsr the local is 30000
app.listen(process.env.PORT || 3000)