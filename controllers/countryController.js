const router = require('express').Router()
// const db = require('../models')
const axios = require('axios')


router.get('/', (req, res) => {
    res.render('searchcountry/search')
})

router.get('/league', async (req, res) => {
    try {

        const leagueInfoURL = `https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=${req.query.typedCountryName}&s=Soccer`
        const leagueResponse = await axios.request(leagueInfoURL)
        console.log(leagueResponse);
        const leagueLists = leagueResponse.data
        // const leagueTemp = leagueLists.countrys

        var maxSpeed = {
            car: 300, 
            bike: 60, 
            motorbike: 200, 
            airplane: 1000,
            helicopter: 400, 
            rocket: 8 * 60 * 60
        };
        var sortable = [];
        for (var vehicle in maxSpeed) {
            sortable.push([vehicle, maxSpeed[vehicle]]);
        }
        
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });


        res.render('searchcountry/league', { leagueLists: leagueLists.countrys })
    } catch (err) {
        console.log(err);
    }
})

// router.get('/lists', (req, res) => {
//     res.render('searchcountry/countrylists')
// })


module.exports = router;




/* Routes */
// router.get('')
// router.get('/', async (req, res) => {
//     try {
//         console.log('adjkflajdflajdfjadfjald')
//         const axios = require('axios')

//         const leagueInfoURL = {
//             url: 'https://api-football-v1.p.rapidapi.com/leagues',
//             headers: {
//                 'x-rapidapi-key': '1be5738639msh5d16bb510d9154cp1b271cjsna787e1a9bcb5',
//                 'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//             }
//         }
//         const response = await axios.request(leagueInfoURL)
//         const leagues = response.data
//         const countryResults = leagues.api.leagues

//         //find object key in object
//         let countryKeyObjs = Object.keys(countryResults).filter(key => countryResults[key].country === `${req.query.typedCountryName}`)
//         let filteredLeaguesId = []
//         let filteredleagueName = []
//         for (let i=0; i < countryKeyObjs.length; i++) {
//             const leagueName = countryResults[countryKeyObjs[i]].name
//             const leagueId = countryResults[countryKeyObjs[i]].league_id
//             if (!filteredleagueName.includes(leagueName)){
//                 filteredLeaguesId.push(leagueId);
//                 filteredleagueName.push(leagueName);
//             }
//             // tempcountryResults[countryKeyObjs[i]].name
//         }
//         res.render('country/index', { countryResults: countryResults, countryKeyObjs: filteredLeaguesId, leagueNames: filteredleagueName })
//     } catch (err) {
//         console.log(err);
//     }
// })