const mongoose = require('mongoose')
const { Schema } = mongoose

const sessionSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    counselor: {type: String, required: true},
    user: { type: String, required: true},
    sessionDate: { type:Date, default: Date.now, required: true}
})

module.exports = mongoose.model('Session', sessionSchema)