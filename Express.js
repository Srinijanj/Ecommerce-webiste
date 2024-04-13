const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, images)
app.use(express.static('public'));

// Route to handle login
app.post('/login', (req, res) => {
    // Check username and password
    const { username, password } = req.body;
    if (username === 'your_username' && password === 'your_password') {
        // Set session variable to indicate login
        req.session.isLoggedIn = true;
        res.send({ success: true });
    } else {
        res.status(401).send({ success: false, message: 'Invalid username or password' });
    }
});

// Route to check login status
app.get('/check-login', (req, res) => {
    // Check if user is logged in
    if (req.session.isLoggedIn) {
        res.send({ isLoggedIn: true });
    } else {
        res.send({ isLoggedIn: false });
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
