require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRouter=require('./routes/signupRoutes')
const pool=require('./mySql')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const nodemailer = require('nodemailer');
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;
app.use('/users',signupRouter)

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajeeb1211@gmail.com',
    pass: 'priyamewara'
  }
});

// Endpoint to handle email sending
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'ajeeb1211@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
