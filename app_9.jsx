const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'librarySecret123', // change this in production
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello Aum!!!');
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Handle login
app.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') {
    return res.render('login', { message: 'Please enter your name.' });
  }

  // Create session
  req.session.user = {
    name: username,
    loginTime: new Date().toLocaleString()
  };

  res.redirect('/profile');
});

// Profile page
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('profile', { user: req.session.user });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/login');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Library portal running on http://localhost:${PORT}`);
});
