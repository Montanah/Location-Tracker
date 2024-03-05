const db = require('../config');
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

    // query db to heck if user email already exists
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
