const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')

const app = express()
require('./database')

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

// Routes
const chat = require('./routes/chat')
const users = require('./routes/users')
const sessions = require('./routes/sessions')

app.use('/chat', chat)
app.use('/users', users)
app.use('/sessions', sessions)

// Static files
app.use(express.static(path.join(__dirname, 'public'))) 

module.exports = app

//Server Initialize
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})
