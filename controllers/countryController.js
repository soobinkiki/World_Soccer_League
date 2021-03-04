const router = require('express').Router()
// const db = require('../models')
const axios = require('axios')


router.get('/', (req, res) => {
    res.render('searchcountry/search')
})

router.get('/league', async (req, res) => {
    try {
        if (req.query.typedCountryName === "") {
            res.redirect('/country')
            return
        }
        const leagueInfoURL = `https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=${req.query.typedCountryName}&s=Soccer`
        const leagueResponse = await axios.request(leagueInfoURL)
        const leagueLists = leagueResponse.data
        
        res.render('searchcountry/league', { leagueLists: leagueLists.countrys })
    } catch (err) {
        console.log(err);
    }
})

// when user clicks to see the club lists
router.get('/club', async (req, res) => {
    try {
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${req.query.leagueId}` 
        const response = await axios.get(clubURL)
        const clubs = response.data

        res.render('club/showClub', { clubs: clubs.teams })
    } catch (err) {
        console.log(err);
    }})

module.exports = router;
