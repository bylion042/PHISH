const mongoose = require('mongoose');

const victimSchema = new mongoose.Schema({
    emailOrNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Victim = mongoose.model('Victim', victimSchema);
module.exports = Victim;
