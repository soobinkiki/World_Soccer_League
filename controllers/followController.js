const router = require('express').Router()
const db = require('../models')
const axios = require('axios')
const alert = require('alert')

router.post('/league/:leagueId', async (req, res) => {
    try {
        const leagueURL = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${req.params.leagueId}` 
        const response = await axios.get(leagueURL)
        const leagues = response.data
        const leagueName = leagues.leagues[0].strLeague

        const [oneLeague, createdTrueOrFalse] = await db.league.findOrCreate({
            where: {
                leaguename: leagueName,
                leagueid: req.params.leagueId
            }
        })
        const user = await db.user.findOne({
            where :{
                id: res.locals.user.dataValues.id
            }
        })
        user.addLeague(oneLeague)
        alert("NOW FOLLOWING")    // Think of the way to change the text of the submit button
    } catch (err) {
        console.log(err);
    }
})

router.get('/', (req, res) => {
        res.render('follow/following')
})

router.get('/list/league', async (req, res) => {
    try {
        const userLeagueJoinTable = await db.users_leagues.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        const storeLeagueId = []
        for (let i=0; i < userLeagueJoinTable.length; i++) {
            const findLeaugeId = await db.league.findOne({
                where: {
                    id: userLeagueJoinTable[i].leagueId
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

router.post('/club/:clubId', async (req, res) => {
    try {
        const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${req.params.clubId}` 
        const response = await axios.get(clubURL)
        const clubs = response.data
        const clubName = clubs.teams[0].strTeam

        const [oneClub, createdOrNot] = await db.club.findOrCreate({
            where: {
                clubname: clubName,
                clubid: req.params.clubId
            }
        })
        const user = await db.user.findOne({
            where :{
                id: res.locals.user.dataValues.id
            }
        })
        user.addClub(oneClub)
        alert("NOW FOLLOWING")    // Think of the way to change the text of the submit button
    } catch (err) {
        console.log(err);
    }
})

router.get('/list/club', async (req, res) => {
    try {
        const usersClubsJoinTable = await db.users_clubs.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        const storeClubId = []
        for (let i = 0; i < usersClubsJoinTable.length; i++) {
            const findClubId = await db.club.findOne({
                where: {
                    id: usersClubsJoinTable[i].clubId
                }
            })
            const clubIdLists = findClubId.dataValues.clubid;
            storeClubId.push(clubIdLists)
        }

        const tempClubs = []
        for (let i = 0; i < storeClubId.length; i++) {
            const clubURL = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${storeClubId[i]}` 
            const response = await axios.get(clubURL)
            const responseClubs = response.data
            tempClubs.push(responseClubs)
        }
        const clubs = tempClubs
        // console.log(clubs[1].teams[0]);

        res.render('follow/followingClub', { clubs: clubs})
    } catch (err) {
        console.log(err);
    }
})

module.exports = router