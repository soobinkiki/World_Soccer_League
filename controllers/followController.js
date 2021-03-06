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
        alert("NOW FOLLOWING")
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
        const storedLeaugeInfos = []
        for (let i = 0; i < userLeagueJoinTable.length; i++) {
            const leagueName = await db.league.findAll({
                where: {
                    id: userLeagueJoinTable[i].dataValues.leagueId
                }, 
            })            
            storedLeaugeInfos.push(leagueName[0].dataValues)
        }
        res.render('follow/followingLeague', { storedLeaugeInfos: storedLeaugeInfos })
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
        const userClubJoinTable = await db.users_clubs.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        const storedClubInfos = []
        for (let i = 0; i < userClubJoinTable.length; i++) {
            const clubName = await db.club.findAll({
                where: {
                    id: userClubJoinTable[i].dataValues.clubId
                }, 
            })
            storedClubInfos.push(clubName[0].dataValues)
        }
        res.render('follow/followingClub', { storedClubInfos: storedClubInfos })
        console.log(err);
    } catch (err) {
        console.log(err);
    }
})




router.delete('/league/:leagueId', async (req, res) => {
    console.log("hello");
    try {
        const currentUser = await db.users_leagues.findOne({
            where: {
                userId: res.locals.user.dataValues.id
            }, 
        })
        console.log(currentUser);
        

        
    } catch (err) {
        console.log(err);
    }
})

module.exports = router