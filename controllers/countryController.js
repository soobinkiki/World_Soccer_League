const router = require('express').Router()
// const db = require('../models')

router.get('/', async (req, res) => {
    try {
        const axios = require('axios')

        const countryInfoURL = 'https://www.thesportsdb.com/api/v1/json/1/all_countries.php'
        const countryResponse = await axios.request(countryInfoURL)
        const countryLists = countryResponse.data.countries
        console.log(countryLists);

        
        // for (let i=0; i < countryLists.length; i++) {
        //     const trimmedLists = []
        //     const temp = countryLists[i].name_en.replace(/\s+/g,'')
        //     trimmedLists.push(temp)
        //     console.log(trimmedLists);
        // }
        
        // const leagueInfoURL = `https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=${req.query.typedCountryName}&s=Soccer`
        // const leagueResponse = await axios.request(leagueInfoURL)
        // const leagueLists = leagueResponse.data
        // console.log(countryLists);



        res.render('searchcountry/search', { countryLists: countryLists })
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;
