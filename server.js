   
   
   // this code should be in the server 
   // and this server must be replace with the project server i mean the server which include all other pages
   
    const dotenv    = require('dotenv');    
    const express  = require('express');
    const path     = require('path');
    const cors     = require('cors');
    const mongoose = require('mongoose');
    
    dotenv.config({path: './config.env'});
    // import the finance 
    const finance = require('./Finance/finance');

    const server= express();
    server.use(cors());
    server.use(express.json());
    // updated  
    server.use(finance);
    // the path where the finance frontend page going to be served 
    // on my divece the page path = ../softwareProject/my-app/build'
    server.use(express.static(path.join(__dirname,'../softwareProject/my-app/build')));  
    // for this part i think you can create your own router for each pages 
    server.get(['/finance','/paidsalry','/sold-products','/salary-payment','/expense','/revenue','/pay-expense','/sold-products','/hospitalService'], (req, res) => {
        try{
        res.sendFile(path.join(__dirname,'../softwareProject/my-app/build','index.html'));}
        catch{
            res.status(404).send('server error');
        }
    });


    mongoose.connect(process.env.database).then(()=>console.log('data base connected'));
    const port= process.env.PORT;
    server.listen(port,()=>{   
        console.log(`app running on port ${port} ...`); 
    });