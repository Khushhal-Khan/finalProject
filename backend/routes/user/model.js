
const { default: mongoose } = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
     name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
