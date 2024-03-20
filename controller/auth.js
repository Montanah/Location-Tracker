const db = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Countries fetch controller
exports.fetchCountries = (req, res) => {
    try {
        // Fetch countries from the database
        db.query('SELECT * FROM countries', (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            // Extract countries from the results
            const countries = {
                countries: results,
            };

            // Send the countries in the response
            res.status(200).json(countries);
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Register a new user controller, assuming name fields match
exports.register = async (req, res) => {
    const { name, email, password, password2 } = req.body;

    // Input validation from server side
    if (!name || !email || !password || !password2) {
        return res.render('register', {
            message: 'All fields are required'
        });
    }

    // query db to check if user email already exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'User already exists!'
            });
        }

        // Password matching
        if (password !== password2) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        //if basic validation passes 
        try {
            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Internal Server Error');
                }

                 // Generate JWT token upon successful registration
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });


                // Redirect user to login form after successful registration
                res.redirect('/login');
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation from server side
        if (!email || !password) {
            return res.render('login', {
                message: 'All fields are required'
            });
        }

        // Query db to check if user email exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.render('login', {
                    message: 'User does not exist'
                });
            }

            // Compare hashed password with user input
            if (!await bcrypt.compare(password, results[0].password)) {
                return res.render('login', {
                    message: 'Email or password is incorrect'
                });
            } else {
                // Generate JWT token upon successful login
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Redirect to user dashboard after successful login
                res.redirect('/dashboard');
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Logout controller
exports.logout = (req, res) => {
    res.redirect('/');
};

// Dashboard controller
exports.dashboard = (req, res) => {
    res.render('dashboard');
};

// Profile controller
exports.fetchUserProfile = (req, res) => {
    try {
        // Extract access token from request header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // fetch user profile data from db
        db.query('SELECT * FROM users WHERE email = ?', [decoded.email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            // Extract user profile data
            const userProfile = {
                name: results[0].name,
                avatar_url: results[0].avatar_url,
            };

            // Send the user profile data in the response
            res.status(200).json(userProfile);
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Add location controller
exports.addLocation = (req, res) => {
    const { location, email } = req.body;

    // Input validation from server side
    if (!location || !email) {
        return res.status(400).send('All fields are required');
    }

    // Insert new location into the database
    db.query('INSERT INTO locations SET ?', { location, email }, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        // Send success message in the response
        res.status(201).send('Location added successfully');
    });
};

// Locations display controller
exports.displayLocations = (req, res) => {
    try {
        // Extract access token from request header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // fetch user profile data from db
        db.query('SELECT * FROM locations WHERE email = ?', [decoded.email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            // Extract user profile data
            const userLocations = {
                locations: results,
            };

            // Send the user profile data in the response
            res.status(200).json(userLocations);
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Forgot password controller
exports.forgotPassword = (req, res) => {
    res.render('forgotPassword');
};

// Reset password controller
exports.resetPassword = (req, res) => {
    res.render('resetPassword');
};

// Update password controller
exports.updatePassword = (req, res) => {
    res.render('updatePassword');
};