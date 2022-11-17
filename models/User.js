 const {Schema, model} = require('mongoose')

 const User = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    regDate: {type: Date, default: Date.now},
    authDate: {type: Date, default: Date.now},
    status: {type: String, default: "blocked"}
 })
 module.exports = model('User', User)