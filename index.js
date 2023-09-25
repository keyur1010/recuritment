const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const bodyParser = require('body-parser')
const path=require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json())
app.use(express.static(path.join(__dirname, "./public")))
app.use(session({
    secret: 'thisiskey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
require('../recruit_portal/config/database')

const clientRoutes=require('./routes/clientRoutes')
const loginRoutes = require('./routes/loginRoutes')
app.use('/', loginRoutes)
app.use('/client',clientRoutes)
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})