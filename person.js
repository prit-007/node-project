const mongoose = require('mongoose')

const Person = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "mobileNumber": String,
    "address": String,
    "fbAvatar": String,
    "accountBalance": String,
    "age": Number,
    "expireince": Number,
    "image": String,
    "detail": String,
})
// const Person = new mongoose.Schema({
//     firstName : req.body.firstName,
//     lastName : req.body.lastName,
//     mobileNumber : req.body.mobileNumber,
//     address : req.body.address,
//     fbAvatar : req.body.fbAvatar,
//     accountBalance : req.body.accountBalance,
//     age : req.body.age,
//     expireince : req.body.expireince,
//     image : req.body.image,
//     detail: Sreq.body.detail
// })
module.exports = new mongoose.model('Person', Person);