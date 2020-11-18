const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/introMongo', { useNewUrlParser: true })
}

connect()
    .then(async connection => {
    })
    .catch(e => console.error(e))