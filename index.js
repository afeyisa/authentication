/* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
/* author Feyisa kenenisa */
  
/* this program is not part of finance project

    **********************************
    * pages and their corresponding  *
    * functions we need to impliment *
    * ********************************
    *******************************
    *pages          |  requests   *
    ****************|**************
    *login          |  post, get  *
    ****************|**************
    *home           |  get        *
    ****************|**************
    *register       |  post , get *
    *mybookstore    | post , get  * 
    *******************************/ 

    const dotenv      = require('dotenv');    
    const express     = require('express');
    const mongoose    = require('mongoose');
    const session     = require('express-session');
    const passport    = require('passport');
    const routeTo     = require('./authentication/router/route');
  


    const server       = express();

    /*************************cookies and authentication********************************** */

    /*note order matters when we are using both passport and session 
     * order is session then passport */
    server.use(
        session({
            // for signing the session
            secret:"rendom words is best for this",
            // for choosing where to save the sission server or database (false=>server)
            resave:false,
            // store uninitialized session into server memory
            saveUninitialized : true,
          //  Cookie:{maxAge:1000*60}
        })
    );

    server.use(passport.initialize());
    server.use(passport.session());
/******************************************************************************************** */

    // take care of order on this part

    server.use(routeTo);   

    // configuration database and port numbers
    mongoose.connect('mongodb://localhost:27017/Tina_bookstore').then(()=>console.log('data base connected'));

    const port= 5000;
    server.listen(port,()=>{   
        console.log(`app running on port ${port} ...`); 
    });



    /* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */