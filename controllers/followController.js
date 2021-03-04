const router = require('express').Router()
const db = require('../models')
const axios = require('axios')
const alert = require('alert')

// when user clicks the FOLLOW, create into database the league and (render) display it to the FRONT
// follow league
router.post('/league/:leagueId', async (req, res) => {
    try {
        // console.log("🚗🚗🚗🚗🚗🚗🚗🚗🚗", res.locals.user.dataValues.id);
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${req.params.leagueId}` 
        const response = await axios.get(clubURL)
        const clubs = response.data
        const clubName = clubs.leagues[0].strLeague


        // added trueOrFalse -> working
        const [oneLeague, createdTrueOrFalse] = await db.league.findOrCreate({
            where: {
                leagueId: req.params.leagueId,
                leaguename: clubName
            }
        })

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
        alert("FOLLOWING NOW!")
        // res.redirect(`/follow/league/${req.params.leagueId}`)
        // res.redirect('/follow/following', { abc: abc })

    } catch (err) {
        console.log(err);
    }
})

router.get('/', async (req, res) => {
    try {

        // const user = await db.user.findOne({
        //     where :{
        //         id: res.locals.user.dataValues.id
        //     }
        // })
        
        const userFromJoinTable = await db.users_leagues.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        // get all leaguename and use this into API(if available) to get details from each league


        userFromJoinTable.dataValues.leagueId
        // userFromJoinTable.leagueId
        console.log(userFromJoinTable);
    
        // res.render('follow/following', { userFromJoinTable: userFromJoinTable})
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