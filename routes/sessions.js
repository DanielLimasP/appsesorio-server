const express = require('express')
const router = express.Router()
const SessionModel = require('../models/Session')

router.post('/user-sessions', async (req, res)=>{
    let userId = req.body.userid
    let userSessions = await SessionModel.find({user: userId})
    console.log({message: 'User sessions', sessions: userSessions})
    return res.status(200).send({message: 'User sessions', sessions: userSessions})
})

router.get('/all-sessions', async (req, res)=>{
    let allSessions = await SessionModel.find().sort({sessionDate: 'desc'})
    console.log({Sessions: allSessions})
    return res.status(200).send({message: 'All sessions', sessions: allSessions})
})

router.post('/new-session', async (req, res)=>{
    const { title, description, topics, counselor, user, date, place } = req.body
    console.log("Body")
    console.log(req.body)
    // Session Creation
    const newSession = new SessionModel({title, description, topics, counselor, user, date, place})
    await newSession.save()
    console.log('Session Created')
    console.log({message: 'Session created', Session: req.body})
    return  res.status(200).send({message: 'Session created', Session: req.body})
})

module.exports = router