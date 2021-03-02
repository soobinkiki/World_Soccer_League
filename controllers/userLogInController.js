const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
    res.render('user/login')
})

router.post('/', async (req, res) => {
    try {
        const compareDatabase = await db.user.findOne({
            where: {
                username: req.body.username
            }
        })
        
        console.log(compareDatabase);
        // console.log(compareDatabase);
        if(compareDatabase != null) {
            res.send("hello")
        } else {
            res.send("yeah")
        }
        // res.render('user/login')
        
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
