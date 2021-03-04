const router = require('express').Router()
const db = require('../models')
const axios = require('axios')
const alert = require('alert')

// when user clicks the FOLLOW, create into database the league and (render) display it to the FRONT
// follow league
router.post('/league/:leagueId', async (req, res) => {
    try {
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${req.params.leagueId}` 
        const response = await axios.get(clubURL)
        const clubs = response.data
        const clubName = clubs.leagues[0].strLeague

        /*----------- 2nd------worked----*/
        // added createdTrueOrFalse -> working
        const [oneLeague, createdTrueOrFalse] = await db.league.findOrCreate({
            where: {
                leaguename: clubName,
                leagueid: req.params.leagueId
            }
        })
        /*-----------1st-------------*/
        // const oneLeague = await db.league.findOrCreate({
        //     where: {
        //         leaguename: clubName,
        //         leagueid: req.params.leagueId
        //     }
        // })
        // var oneLeague = await db.league.findOrCreate({
        //     where: {
        //         leaguename: clubName
        //     }
        // })

        // oneLeague = await db.league.findOne({
        //     where: {
        //         leaguename: clubName
        //     }
        // })

        const user = await db.user.findOne({
            where :{
                id: res.locals.user.dataValues.id
            }
        })
       // console.log("🚗🚗🚗🚗🚗🚗🚗🚗🚗", user.id)
        // console.log(user);
        // res.locals.user.addLeague(oneLeague)
        // user.addLeague(oneLeague) 
        user.addLeague(oneLeague)
        // npm i alert installed
        alert("FOLLOWING NOW!")    // Think of the way to change the text of the submit button
        // res.redirect(`/follow/league/${req.params.leagueId}`)
        // res.redirect('/follow/following', { abc: abc })

    } catch (err) {
        console.log(err);
    }
})

router.get('/', (req, res) => {
        res.render('follow/following')
})

router.get('/list/league', async (req, res) => {
    try {
        const userFromJoinTable = await db.users_leagues.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        const storeLeagueId = []
        for (let i=0; i < userFromJoinTable.length; i++) {
  
            const findLeaugeId = await db.league.findOne({
                where: {
                    id: userFromJoinTable[i].leagueId
                }
            })
            const leagueId = findLeaugeId.dataValues.leagueid;
            storeLeagueId.push(leagueId)
        }
        const leagueLists = []
        for (let i = 0; i < storeLeagueId.length; i++) {
            const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${storeLeagueId[i]}` 
            const response = await axios.get(clubURL)
            const clubs = response.data
            leagueLists.push(clubs)
        }
        res.render('follow/followingLeague', { leagueLists: leagueLists})
    } catch (err) {
        console.log(err);
    }
})

router.get('/list/club', async (req, res) => {
    try {
        








        res.render('follow/followingClub')
    } catch (err) {
        console.log(err);
    }
})


















// // follow club
// router.post('/club',  async (req, res) => {
//     try {
//         const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${req.query.leagueId}` 
//         const response = await axios.get(clubURL)
//         console.log(response);
//         const clubs = response.data.teams

//         res.render('follow/following', { clubs: clubs})
//     } catch (err) {
//         console.log(err);
//     }
// })


module.exports = router