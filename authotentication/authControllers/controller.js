const usersSchema  = require('../models/users');
const path         = require('path');
const bcrypt       = require('bcrypt');


/* it  stores user information to data base if the intered email is not in the database
 * and redirect the user to main page after storing the information*/
exports.createUser = async(req,res)=>{ 
    try{

        const saltingRound = 10;
        const user         = await usersSchema.users.find({email:req.body.email});

        // it checks the user email whether is in the database 
        if(user.length===0){

            // hashing password with salting property  
            bcrypt.hash(req.body.password,saltingRound, async(err,hash)=>{

            // it create user and stores to database if error not occurred while hashing the password 
            if(!err){
               await usersSchema.users.create({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:hash });
                    res.sendFile(path.join(__dirname,'../public','login.html'));}
            else{
                    res.status(404).send('some thing is wrong');
                }
            });
        }
        else{
            res.status(404).json({ error: 'duplicated email' });}
            }
    catch(err){
        res.status(404).json({ error: 'server error' });
    }
};

/* it checks if the user has registered and
 * redirect the user to  main page if the entered password is correct*/
exports.authUser = async(req,res)=>{
        try{
            const password = req.body.password;
            const email    = req.body.email;
            const user     = await usersSchema.users.find({email:req.body.email});

            //checks whether the user exist in database and whether the user is unique in the database
            if(user.length===1){
                // comparing the input password from a user with the stored hashed password
                bcrypt.compare(password,user[0].password,(err,res)=>{
                    if(err){
                        console.log(err);
                        res.send("somthing is wrong");
                    }else{
                        if(res){
                        res.sendFile(path.join(__dirname,'../public','index.html'));
                        }
                        else{                    
                            res.send("wrong password");
                        }
                    }
                });
            }else{
                res.send("user not found");}
        }catch{
                res.status(404).send('something went wrong');
            } 
    };