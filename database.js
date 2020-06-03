const mongoose = require('mongoose')
const url = 'mongodb://localhost:appsesorio'
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(db => console.log('DB up and running'))
.catch(err => console.log(err))