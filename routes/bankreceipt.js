const express = require('express');
const router = express.Router(); 

// OPAY RECEIPT ROUTE
router.get('/opay', (req, res) => {
    res.render('opay');  // Render the 'opay.ejs' file
});

module.exports = router;
