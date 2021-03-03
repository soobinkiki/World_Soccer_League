const router = require('express').Router()
const db = require('../models')
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    res.render('user/login')
})

router.post('/', async (req, res) => {
    try {
        const foundUsername = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })

        if (bcrypt.compareSync(req.body.password, foundUsername.dataValues.password)) {
            const encryptedId = AES.encrypt(foundUsername.id.toString(), 'secret').toString()
            res.cookie('userId', encryptedId)
            res.redirect('/country')
        } else {
          res.render('users/loginFail')
        }
    
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
