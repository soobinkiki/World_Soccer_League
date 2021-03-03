const router = require('express').Router()
const db = require('../models')
const axios = require('axios')


// when user clicks the FOLLOW, create into database the league and (render) display it to the FRONT
router.post('/',  async (req, res) => {
    try {
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${req.query.leagueId}` 
        const response = await axios.get(clubURL)
        console.log(response);
        const clubs = response.data
        console.log(clubs);

    } catch (err) {
        console.log(err);
    }
})






module.exports = router