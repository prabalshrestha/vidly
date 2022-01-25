const config=require('config');
const express = require('express');
const genres = require('./routes/genres');
const customers =require('./routes/customer');
const movies=require('./routes/movies');
const rental=require('./routes/rentals');
const register=require('./routes/register');
const login=require('./routes/login');
const app=express();

const mongoose= require('mongoose');

// if(!config.get('jwtPrivateKey')){
//         console.error('jwtPrivateKey is not defined');
//         process.exit(1);
// }

mongoose.connect('mongodb://localhost/vid')
        .then(()=>console.log('Connected to MongoDb'))
        .catch(err=>console.error('Error',err));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rental',rental);
app.use('/api/register',register);
app.use('/api/login',login);

app.listen(3000,()=>console.log('Connection on 3000'));