const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/AES')


router.post('/', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = await db.user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const userName = req.body.username
        const encryptedId = AES.encrypt(newUser.id.toString(), 'abcdefg').toString()
        const encryptedIdString = encryptedId.toString()
        res.cookie('userId', encryptedIdString)
        console.log(userName)
        res.render('user/welcome', { userName: userName })
    } catch {
        console.log(err);
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})


  
  


module.exports = router;