// app.js
//setting up and importng required dependencies for the porject
const express = require('express');
const path = require('path');
const db = require('./config');




const app = express();
const PORT = process.env.PORT || 8000;




//using the hbs template engine
//this gives access to the current directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Database connected!')
    }
})
// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//defined routes
app.use('/', require('./routes/users'))
app.use('/auth', require('./routes/auth'));







// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
