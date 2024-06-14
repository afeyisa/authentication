/* Thank you  Lord Jesus Christ  🙏🙏🙏 */
/* author Feyisa Kenenisa */

//strategy is needed for logging in options
const { Strategy } = require("passport-local").Strategy;
const usersSchema  = require('../models/users');
const path         = require('path');
const bcrypt       = require('bcrypt');
const passport     = require('passport');
const dotenv       = require('dotenv'); 
const fs           = require('node:fs');   
dotenv.config({path: './config.env'});


exports.root = ((req, res) =>{
    res.redirect('/home');

});

/*******************handles home part************************************************************** */

// sends home page to the req user is new
// sends login page to the req if user is arleady registered
exports.home  =  ( (req, res) => {

    if (parseInt(process.env.userNum) === 0){
        try{
            res.sendFile(path.join(__dirname,'../public','createdatabase.html'));}
            catch{
                res.status(404).send('server error');
            }
    }


    else if (parseInt(process.env.userNum) === 1){
        res.redirect("/login");
    }


    else{
        res.status(404).send("your database can't handle beyond one user check you enviroment variable");
    }
   
});
/* ****************************************************************************************** */






/***********************handles  database initializations  */
// creates every thing of database initializations
const initializeDatabase =(dbName)=>{
    //  implimentation of inital database

};




/* *************************handles registiration of user************************************************/

/* it  stores user information to data base if the intered email is not in the database
 * and redirect the user to main dashboard after storing the information*/
exports.createUser = async(req,res)=>{ 
    try{
        const saltingRound = 10;

        initializeDatabase(req.databaseName);

        const user         = await usersSchema.user.find({user:req.body.User});
        // it checks the user email whether is in the database 
        console.log(req.body);
        if(user.length === 0){

            // hashing password with salting property  
            bcrypt.hash(req.body.password,saltingRound, async(err,hash)=>{
            // it create user and stores to database if error not occurred while hashing the password 
                if(!err){
                    try{
                        // here posgressql is neded ########################
                    await usersSchema.user.create({
                        databaseName:req.body.Database,
                        user:req.body.User,
                        password:hash }).then(()=>{

                            //update enviroment variable from 0 to 1
                            const filePath = './config.env';
                            // Step 1: Read the file content
                            fs.readFile(filePath, 'utf8', (err, data) => {
                                if (err) {
                                    console.error(`Error reading the file: ${err}`);
                                    return;
                                }

                                // Step 2: Modify the content
                                const modifiedContent = data.replace('userNum=0', 'userNum=1');

                                // Step 3: Write the modified content back to the file
                                fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
                                   
                                    if (err) {
                                        console.error(`Error writing the file: ${err}`);
                                        return;
                                    }

                                    console.log('File has been updated!');
                                    process.env.userNum = 1;
                                
                                });
                            });

                                fs.readFile('./config.env', 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                console.log(data);
                                });

                                console.log(process.env.userNum);

                        });
                    // i will check how to get the inserted values without querying it back like blow
                    const result = await usersSchema.user.find({user:req.body.User});//##########posgressql is needed here
                    const user   = result[0];

                    console.log(user);
                    req.login(user,(err)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.redirect('/mybookstore'); 
                        }
                    });
                    res.sendFile(path.join(__dirname,'../public','login.html'));
                }
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
            res.redirect('/login');}
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
        usernameField: 'User',
        passwordField: 'password'
    },
    async function  verify(User,password,cb){
        console.log('test is in login process');

            try{
                const user     = await usersSchema.user.find({user:User});///######################posgressql is needed here
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
        res.sendFile(path.join(__dirname,'../public/build','bookstore.html'));
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
