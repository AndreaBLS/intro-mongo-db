const mongoose = require('mongoose')
const express = require("express")
const app = express()
const morgan = require("dev")
const { urlencoded, json } = require("body-parser")
const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        minlength: 10
    }
})

const NoteModel = mongoose.model("note", noteSchema)

app.use(morgan("dev"))
app.use(urlencoded({ extended: true }))
app.use(json())

app.get("/note", async (req, res) => {
    const notes = await Note.find({}).exec()
    .skip(10)
    .limit(10)
    .exec()
    console.log(notes)
    res.status(200).json(notes)
})

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/introMongo', { useNewUrlParser: true })
}

connect()
    .then(async connection => {
    })
    .catch(e => console.error(e))