const router = require('express').Router()
const db = require('../models')


router.get('/', async (req, res) => {
    try {
        // const compareDatabase = await db.user.findOne({
        //     where : {
        //         username: req.body.username
        //     }
        // })
        // console.log(compareDatabase);
        // // if(compareDatabase != null && compareDatabase ) {
        // //     res.redirect('/country')
        // // }
        res.send("HI")
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
