const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

router.get('/', async (req, res) => {
    try {
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4648` 
        const response = await axios.get(clubURL)
        const clubs = response.data.results
        console.log(clubs);

    } catch (err) {
        console.log(err);
    }
})






// module.exports = router