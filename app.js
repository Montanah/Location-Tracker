//setting up and importng required dependencies for the porject
require('dotenv').config();
const express = require('express');
const path = require('path');
// const db = require('./config');
const CORS = require('cors');
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: "./.env"})

//connecting the db
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});

// Handling connection errors
db.on('error', (err) => {
    console.error('MySQL connection error:', err);
  });
  
  // Establishing the database connection
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

//using the hbs template engine
//this gives access to the current directory
const publicDirectory = path.join(__dirname, './public');
app.use(CORS());
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

//importing the routes
const users = require('./routes/users');
const auth = require('./routes/auth');

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//defined routes
app.use('/', require('./routes/users'))
app.use('/auth', require('./routes/auth'));


// Start the server
app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});
