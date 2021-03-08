const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios') // delete? maybe
const morgan = require('morgan')
const db = require('./models')
const methodOverride = require('method-override')

const app = express()
const rowdyResult = rowdy.begin(app)
const PORT = process.env.PORT || 3000;
const cryptoJS = require('crypto-js')
const AES = require('crypto-js')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('cookie-parser')())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(async (req, res, next) => {  
    if (req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, 'secret').toString(cryptoJS.enc.Utf8)
        const user = await db.user.findOne({
            where: {
                id: decryptedId
            }
        })
        res.locals.user = user
    } else {
      res.locals.user = null
    }
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})
 
app.use('/users', require('./controllers/userController'))
app.use('/country', require('./controllers/countryController'))
app.use('/login', require('./controllers/userLogInController'))
app.use('/follow', require('./controllers/followController'))

app.listen(PORT, () => {
    rowdyResult.print()
})