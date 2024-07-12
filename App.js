const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {urlencoded,json} = require('body-parser')
const blogRoutes = require('./api/routes/Blog')
const categoryRoutes = require('./api/routes/Category')
const auth = require('./api/routes/Auth')
const comment = require('./api/routes/Comment')
const cors = require('cors')

mongoose.connect('mongodb+srv://musaddiquemomin018:9766866541@curdapp.no0iw8h.mongodb.net/?retryWrites=true&w=majority&appName=curdApp')
mongoose.connection.on('connected',()=>{
    console.log('connected with database')
})

mongoose.connection.on('error',(err)=>{
    console.log(' not connected with database')
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/blog',blogRoutes)
app.use('/category',categoryRoutes)
app.use('/auth',auth)
app.use('/comment',comment)

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

module.exports = app;