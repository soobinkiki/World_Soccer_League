const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/AES')


router.post('/', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

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