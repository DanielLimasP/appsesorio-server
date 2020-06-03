const express = require('express')
const session = requite('express-session')
const passport = require('passport')

// Inits
const app = express()
require('./database')

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(express.urlencoded({extended: false}))

// Routes
app.use(require('./routes/users'))
app.use(require('./routes/sessions'))

// Server init
app.listen(app.get('port', () => {
    console.log('Server working on PORT: ', app.get('port'))
}))