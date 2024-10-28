const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, 'User Must Be at least 3 character long']
    },
    email:{
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [13, 'User Must Be at least 3 character long']
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password Must Be at least 8 character long']
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;