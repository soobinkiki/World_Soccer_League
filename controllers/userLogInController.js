const router = require('express').Router()
const db = require('../models')
const cryptoJS = require('crypto-js')
const AES = require('crypto-js')

router.get('/', async (req, res) => {
    res.render('user/login')
})

router.post('/', async (req, res) => {
    try {
        const decryptedPassword = cryptoJS.AES.decrypt(req.cookies.password, 'abcdefg').toString(cryptoJS.enc.Utf8)
        
        const compareDatabase = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })
        if(compareDatabase != null && 
            decryptedPassword === req.body.password) {
        console.log(compareDatabase);
        console.log(compareDatabase.dataValues);
        console.log(compareDatabase.dataValues.password);
            res.redirect('/country')
        } else {
            res.render('user/loginFail')
            console.log(compareDatabase);
        console.log(compareDatabase.dataValues);
        console.log(compareDatabase.dataValues.password);
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
