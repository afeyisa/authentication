const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstName : {type:String,  required: [true, ' employee must have a name']},
    lastName  : {type:String,  required: [true, ' user must have last name']},
    email     : {type:String,unique:true,  required: [true, 'user must have email']},
    password  : {type:String,  required: [true,'user must have password']}

});

exports.users = mongoose.model('users',usersSchema);