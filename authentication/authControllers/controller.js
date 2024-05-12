/* Thank you  Lord Jesus Christ  🙏🙏🙏 */
/* author Feyisa Kenenisa */

//strategy is needed for logging in options
const { Strategy } = require("passport-local").Strategy;
const usersSchema  = require('../models/users');
const path         = require('path');
const bcrypt       = require('bcrypt');
const passport     = require('passport');

/*******************handles home part************************************************************** */

// sends home page to the req
exports.home  =  ( (req, res) => {
    try{
    res.sendFile(path.join(__dirname,'../public','index.html'));}
    catch{
        res.status(404).send('server error');
    }
});
/* ****************************************************************************************** */


/* *************************handles registiration part************************************************/

exports.register  =  ((req, res) => {
    try{
    res.sendFile(path.join(__dirname,'../public','register.html'));}
    catch{
        res.status(404).send('server error');
    }
});

/* it  stores user information to data base if the intered email is not in the database
 * and redirect the user to main page after storing the information*/
exports.createUser = async(req,res)=>{ 
    try{
        const saltingRound = 10;
        const user         = await usersSchema.users.find({email:req.body.email});
        // it checks the user email whether is in the database 
        console.log(req.body);
        if(user.length===0){

            // hashing password with salting property  
            bcrypt.hash(req.body.password,saltingRound, async(err,hash)=>{
            // it create user and stores to database if error not occurred while hashing the password 
                if(!err){
                    try{
                    await usersSchema.users.create({
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:hash });
                    // i will check how to get the inserted values without querying it back like blow
                    const result = await usersSchema.users.find({email:req.body.email});
                    const user   = result[0];
                    req.login(user,(err)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.redirect('/mybookstore'); 
                        }
                    });
                    res.sendFile(path.join(__dirname,'../public','login.html'));}
                    catch{
                        console.log('data base error');
                        res.send('error occured');
                    }

                }
                else{
                        res.status(404).send('some thing is wrong');
                    }
            }); 
        }

        else{
            res.status(200).json({ error: 'duplicated email' });}
        }
    catch(err){
                res.status(404).json({ error: 'server error' });
            }
};
/* ******************************************************************************************************** */



/*******************************handles login part***************************************************************** */

// send login page to the req
exports.login  =  ((req, res) => {
    try{
    res.sendFile(path.join(__dirname,'../public','login.html'));}
    catch{
        res.status(404).send('server error');
    }
});


/* it checks if the user has registered and
 * redirect the user to  bookstore page if the entered password and email are correct*/

exports.authenticate = 
    passport.authenticate('local', {
        successRedirect: '/mybookstore',
        failureRedirect: '/login', // Redirect to register page on authentication failure
    });


    // for session saving using local strategy
    // may email will be changed to username
    // varifies user 

    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function  verify(email,password,cb){
        console.log('test is in login process');
    
            try{
                const user     = await usersSchema.users.find({email: email});
                //checks whether the user exist in database and whether the user is unique in the database
                if(user.length===1 ){
                    // comparing the input password from a user with the stored hashed password
                     bcrypt.compare(  password,  user[0].password,  (err,result)=>{
                        if(err){
                            return cb(err);
                        }else{
                            if(result){
                                return cb(null, user[0]);
                            }
                            else{     
                                return cb(null , false),{message:"incorrect password"};           
                            }
                        }
                    });
                }else{
                   return cb("user not found"); }
            }catch(err){
                return cb(err);
                   // res.status(404).send('something went wrong');
                }  
        }));
/* ******************************************************************************************************* */



/* ********************handles book store part******************************************************************** */

// this page is the protect page in this system
exports.bookStore  =  (req, res) => {
    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname,'../public','mybookstore.html'));
    
    }else{
        res.redirect("/login");    
    }
};
/* ****************************************************************************************************** */


    passport.serializeUser((user , cb)=>{
        cb(null, user);
      });  
    
      passport.deserializeUser((user , cb)=>{
        cb(null, user);
      });


      
  /* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
