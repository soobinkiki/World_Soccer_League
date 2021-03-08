const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/AES')
const alert = require('alert')

router.post('/', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        if (req.body.username === "" || req.body.email === "" || req.body.password === "" ) {
            alert("Please enter the valid username, password and email")
            return;
        }

        const newUser = await db.user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        
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

router.get('/profile', async (req, res) => {
    try {
        const findUser = await db.user.findOne({
            where: {
                id: res.locals.user.dataValues.id
            }
        })
        const currentUser = findUser
        res.render('user/editProfile', { currentUser: currentUser })
    } catch (err) {
        console.log(err);
    }
})

router.put('/edit/', async (req, res) => {
    try {
        const findUser = await db.user.findByPk(res.locals.user.dataValues.id)
        if (req.body.editUsername === "") {
            alert("Please type the username") 
            return
        }
        const changeUsername = await findUser.update({
            username: req.body.editUsername
        })
        if (changeUsername)  {
            res.redirect('/users/profile')
            alert('Username changed')
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;