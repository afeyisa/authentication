/* this program is not part of finance project
    *******************************
    *pages          |  requests   *
    ****************|**************
    *login          |  post, get  *
    ****************|**************
    *home           |  get        *
    ****************|**************
    *register       |  post , get *
    *******************************/ 

    const dotenv      = require('dotenv');    
    const express     = require('express');
    const path        = require('path');
    const cors        = require('cors');
    const mongoose    = require('mongoose');
    const controllers = require('./authotentication/authControllers/controller')
    const bodyParser  = require('body-parser');

    const server       = express();
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(express.static(path.join(__dirname,'./authotentication/public')));  

// router 
    server.get('/home', (req, res) => {
        try{
        res.sendFile(path.join(__dirname,'./authotentication/public','index.html'));}
        catch{
            res.status(404).send('server error');
        }
    });
    server.get('/login', (req, res) => {
        try{
            const password = req.body.password;
            const email = req.body.email;
            console.log(email);
        res.sendFile(path.join(__dirname,'./authotentication/public','login.html'));}
        catch{
            res.status(404).send('server error');
        }
    });
    server.get('/register', (req, res) => {
        try{
        res.sendFile(path.join(__dirname,'./authotentication/public','register.html'));}
        catch{
            res.status(404).send('server error');
        }
    });



    //registration
     server
     .route('/register')
     .post(controllers.createUser);
     //user authorization
     server
     .route('/login')
     .post(controllers.authUser);



    // configuration
    mongoose.connect('mongodb://localhost:27017/Tina_bookstore').then(()=>console.log('data base connected'));
    const port= 5000;
    server.listen(port,()=>{   
        console.log(`app running on port ${port} ...`); 
    });



































//