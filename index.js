const express = require('express')
const app = express()
const multer = require('multer')
const port = 3000
const session = require('express-session')
const bodyParser = require('body-parser')
const path=require('path')
const md5=require('md5')
const flash=require('connect-flash')
// const fileUpload = require('express-fileupload')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json())
// app.use(express.static(path.join(__dirname, "/public")))
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())

app.use(session({
    secret: 'thisiskey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
const upload=multer({dest:'../../uploads'})
// app.use(fileUpload())
require('../recruit_portal/config/database')

const clientRoutes=require('./routes/clientRoutes')
const loginRoutes = require('./routes/loginRoutes')
const adminRoutes=require('./routes/adminRoutes')
const simpleAdmin=require('./routes/simpleAdmin')
const candidateRoutes=require('./routes/candidateRoute')
app.use('/', loginRoutes)

  
app.use('/client',clientRoutes)
app.use('/admin',adminRoutes)
app.use('/m_admin',simpleAdmin)
app.use('/candidate',candidateRoutes)
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})