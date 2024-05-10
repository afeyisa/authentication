/* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
/* author Feyisa kenenisa */

const controllers = require('../authControllers/controller');
const express     = require('express');
const path        = require('path');
const cors        = require('cors');
const bodyParser  = require('body-parser');


const routeTo      = express();

routeTo.use(cors());
routeTo.use(express.json());
routeTo.use(bodyParser.urlencoded({extended: true}));
routeTo.use(express.static(path.join(__dirname,'../public')));

// routing
routeTo
.route('/home')
.get(controllers.home);
//registration
routeTo
.route('/register')
.post(controllers.createUser)
.get(controllers.register);

//user authorization
routeTo
.route('/login')
.post(controllers.authenticate)
.get(controllers.login);
//to ward hidden page
routeTo
.route('/mybookstore')
.get(controllers.bookStore);
 

module.exports = routeTo;