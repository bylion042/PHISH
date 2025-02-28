const express = require('express');
const User = require('../models/User');
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






















module.exports = router;
