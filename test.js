const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/introMongo', { useNewUrlParser: true })
}

const schoolSchema = new mongoose.Schema({
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "district"
    },
    name: {
        type: String
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{ type: String }],//nested schema
})
//INDEXES - 

schoolSchema.index({
    district: 1,
    name: 1
}, { unique: true })

//VIRTUAL - no arrow function
// getter function called when someone tries to retrieve
// setter when someone try to set the value 
schoolSchema.virtual("staffCount")
    .get(function () {
        console.log("in virtual")
        return this.staff.length
    })

// HOOKS-MIDDLEWARE
schoolSchema.pre("save", function () {
    console.log("before save")
})
schoolSchema.pre("validate", function () {
    console.log("before validate")
})
schoolSchema.pre("findOne", function () {
    console.log("before findOne")
})

schoolSchema.post("save", function () {
    console.log("after save")
})
schoolSchema.post("save", function (doc, next) {
    setTimeout(() => {
        console.log("after save", doc)
        next() // you can now move to the next middleware
    }, 300)
})

const SchoolModel = mongoose.model('school', schoolSchema)

connect()
    .then(async connection => {
        const mySchool = await SchoolModel.create({
            name: "my school",
            staff: ["v", "f", "fsa"]
        })
        console.log(mySchool.staffCount)
    })
    .catch(e => console.error(e))