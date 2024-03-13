const db = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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


                // Redirect to user dashboard after successful registration
                res.redirect('/dashboard');
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