require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/contact', (req, res) => {
  res.render('contact', { message: null, error: null });
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.render('contact', { message: null, error: 'Please fill in all fields.' });
  }

  // Create transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


  // Mail options
  let mailOptions = {
    from: email,
    to: '23cs085@charusat.edu.in', // replace with your email
    subject: subject,
    text: `Message from: ${name}\nEmail: ${email}\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('contact', { message: 'Message sent successfully!', error: null });
  } catch (err) {
    console.error(err);
    res.render('contact', { message: null, error: 'Failed to send message. Try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/contact`);
});
