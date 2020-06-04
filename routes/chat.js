const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.post('/send', async(req, res) => {
    const {text, sender, addressee} = req.body
    const newMessage = new Message({text, sender, addressee, date: Date.now()})
    await newMessage.save(newMessage)
    console.log({message: 'Message sent', msg: req.body})
    return  res.status(200).send({message: 'Message sent', msg: req.body})
})

router.post('/get-chat', async(req, res) => {
    let senderid = req.body.senderid
    let adresseeid = req.body.addresseeid
    let message = await Message.find({sender: senderid, addressee: adresseeid})
    let msgCount = await Message.find({sender: senderid, addressee: adresseeid}).count()
    console.log({message: 'Messages', msg: message})
    return res.status(200).send({message: 'Messages', count: msgCount, msg: message})
})

router.get('/get-all-messages', async(req, res) => {
    let message = await Message.find({})
    let msgCount = await Message.find({}).count()
    console.log({message: 'Messages', msg: message})
    return res.status(200).send({message: 'All Messages', count: msgCount, msg: message})
})

module.exports = router