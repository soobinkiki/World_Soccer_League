const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/AES')
const alert = require('alert')


router.post('/', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        if ((req.body.username || req.body.email || req.body.password === "" ) || 
            (req.body.username === 'username' || req.body.email === 'abc@wsl.com' || req.body.password === '12345678')){
            alert("Please enter the valid username, password and email")
            return
        }

        // [ADD] check to see if the username is available
        const newUser = await db.user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedId = AES.encrypt(newUser.id.toString(), 'secret').toString()
        const encryptedIdString = encryptedId.toString()
        res.cookie('userId', encryptedIdString)

        res.redirect('/country')
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})


module.exports = router;