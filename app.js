//setting up and importng required dependencies for the porject
require('dotenv').config();
const express = require('express');
const path = require('path');
const CORS = require('cors');
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const { MongoClient } = require('mongodb');
const connectToMongoDB = require('./dbConnection');
dotenv.config({ path: "./.env"})

//connecting the db
connectToMongoDB().then((db) => {
    app.locals.db = db;
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

//using the hbs template engine
//this gives access to the current directory
const publicDirectory = path.join(__dirname, './public');
app.use(CORS());
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//importing the routes
const countries = require('./routes/countries');
const users = require('./routes/users');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const addLocations = require('./routes/locations');
const displayLocations = require('./routes/locations');

//defined routes
app.use('/countries', countries);
app.use('/', require('./routes/users'))
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/addLocation', addLocations);
app.use('/displayLocations', displayLocations);

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// 404 route
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});
