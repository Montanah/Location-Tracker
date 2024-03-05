const db = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


//register a new user controller
exports.register = (req, res)=> {


    //variables extracted from the name of form inputs
    const{name, email, password, password2} = req.body;


    //query db
    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) =>{
        //checkd if user exists or password matches
        if(error){
            console.error();
        }if (results.length > 0){
            return res.render('register', {
                message: "User already exist!"
            })
        }else if(password != password2){
            return res.render('register', {
                message: "Passwords mismatch"
            });
        }
    })


    //if validated . it returns to the homepage for now
    res.render('/', {
        message: "Profile created"
    })
}