const mongoose = require('mongoose')
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/introMongo', { useNewUrlParser: true })
}

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    faveFood: {
        type: String,
    },
    info: {
        school: {
            type: String
        },
        shoeSize: {
            type: Number
        }
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school', //is the reference written in the Schema down below in model
    }
}, { timestamps: true })

//nested schema
const schoolSchema = new mongoose.Schema({
    name: String,
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{ type: String }]
})

const SchoolModel = mongoose.model('school', schoolSchema)
const StudentModel = mongoose.model('student', studentSchema)

connect()
    .then(async connection => {
        const school1 = {
            name: "mlk elementary",
            openSince: 2009,
            students: 1000,
            isGreat: true,
            staff: ["a", "b", "c"]

        }
        const school2 = {
            name: "Larry Middle School",
            openSince: 1980,
            students: 600,
            isGreat: false,
            staff: ["v", "b", "g"]
        }
        const schools = await SchoolModel.create(
            [school1, school2])

        const matchSchool = await SchoolModel.findOne(
            {
                students: { $gt: 600, $lt: 800 },// $gt/lt = greather/less then
                isGreat: true
            }).exec()
        console.log("matchSchool:", matchSchool)

        matchSchool2 = await SchoolModel.findOne({
            staff: "b"
        }).exec()  
        console.log("matchSchool2: ", matchSchool2)

        matchSchool3 = await SchoolModel.find({
            staff: ["v", "b", "g"]
        })
        .sort("-openSince")
        .limit(2)
        .exec()  
        console.log("matchSchool3: ", matchSchool3)

        const schoolFindUpdate = await SchoolModel.findOneAndUpdate(
            { name: "mlk elementary" },
            { name: "mlk elementary" },
            { upsert: true, new: true })

        const studentCreate = await StudentModel.create({ firstName: 'Gilberto', school: schoolSchema._id })
        const matchById = await StudentModel.findById(studentCreate.id).exec()
        const findByValue = await StudentModel.findOne({ firstName: "Gilberto" })
            .populate('school')
            .exec()
        console.log(matchById)
    })
    .catch(e => console.error(e))