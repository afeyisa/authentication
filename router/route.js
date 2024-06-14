/* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
/* author Feyisa kenenisa */

const authControllers = require('../Controllers/authController');
const inv_controller  = require('../Controllers/inv_controller');
const express         = require('express');
const path            = require('path');
const cors            = require('cors');
const bodyParser      = require('body-parser');


const routeTo      = express.Router();

routeTo.use(cors());
routeTo.use(express.json());
routeTo.use(bodyParser.urlencoded({extended: true}));
routeTo.use(express.static(path.join(__dirname,'../public')));
routeTo.use(express.static(path.join(__dirname,'../public/build')))


// routing
routeTo.
route('/')
.get(authControllers.root);
routeTo
.route('/home')
.get(authControllers.home);
//registration
routeTo
.route('/register')
.post(authControllers.createUser);
//.get(authControllers.register);

//user authorization
routeTo
.route('/login')
.post(authControllers.authenticate)
.get(authControllers.login);
//to ward hidden page
routeTo
.route('/mybookstore')
.get(authControllers.bookStore);
 
routeTo
.route('/searchinventory')
.get(inv_controller.inventorySearch);

module.exports = routeTo;