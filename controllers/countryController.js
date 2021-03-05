const router = require('express').Router()
const db = require('../models')
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
        const clubResponse = await axios.get(clubURL)
        const clubs = clubResponse.data


        const lastMatchURL = `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${req.query.leagueId}` 
        const matchResponse = await axios.get(lastMatchURL)
        const matches = matchResponse.data
        // console.log(matches.events);
        res.render('club/showClub', { clubs: clubs.teams, matches: matches.events })
    } catch (err) {
        console.log(err);
    }})

router.get('/lists', (req, res) => {
    res.render('searchcountry/countryList')
})

module.exports = router;
