const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Renter = mongoose.model("Renter", renterSchema);
module.exports = Renter;
