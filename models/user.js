const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    renter: [{
        type: mongoose.Types.ObjectId,
        ref: 'Renter'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
