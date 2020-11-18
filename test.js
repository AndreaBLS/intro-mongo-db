const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/introMongo', { useNewUrlParser: true })
}

//nested schema
const schoolSchema = new mongoose.Schema({
    name: String,
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{ type: String }],
})

// gettr function called when someone tries to retrieve
// when someone try to set the value 
schoolSchema.virtual("staffCount")
    .get(function () {
        console.log("in virtual")
        return this.staff.length
    })

const SchoolModel = mongoose.model('school', schoolSchema)

connect()
    .then(async connection => {
        const mySchool = await SchoolModel.create({
            name: "my school",
            staff: ["v","f", "fsa"]
        })
    })
    .catch(e => console.error(e))