// app.js
//setting up and importng required dependencies for the porject
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: "./.env"})


const app = express();
const PORT = process.env.PORT || 8000;



//connecting the db
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});

appset('view engine', 'hbs');

db.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Database connected!')
    }
})
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send({
        hello: 'hello',
        size: 'weda'
    })
})


app.get('/hello', (req, res)=>{
    res.status(200).send({
        hello: 'hello',
        size: 'weda'
    })
})






// POST endpoint to receive geolocation data
// app.post('/api/location', (req, res) => {
//     const { latitude, longitude } = req.body;

//     // Process the received geolocation data
//     // Here, you can perform any desired operations with the latitude and longitude

//     // Example: Return a response with the received data
//     res.json({ 
//         status: 'success',
//         message: 'Geolocation data received',
//         latitude,
//         longitude
//     });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
