/* user dabase schema  mongo database*/


const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstName : {type:String,  required: [true, ' employee must have a name']},
    lastName  : {type:String,  required: [true, ' user must have last name']},
    email     : {type:String,  unique:true,  required: [true, 'user must have email']},
    password  : {type:String,  required: [true,'user must have password']}

});

exports.users = mongoose.model('users',usersSchema);


// using mysql database
//       // Create a connection
//       const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'thankyou'
//       });
      
//       // Connect to MySQL server
//       connection.connect((err) => {
//         if (err) {
//           console.error('Error connecting to MySQL:', err);
//           return;
//         }
      
//         console.log('Connected to MySQL!');
      
//         // Select the desired database using a SQL 'USE' statement
//         connection.query('USE schoolsystem2', (useErr, results) => {
//           if (useErr) {
//             console.error('Error selecting database:', useErr);
//             connection.end(); // Close the connection if database selection fails
//             return;
//           }
      
//           console.log('Database selected: schoolsystem2');
      
//           // Now you can execute other queries within the selected database
//           connection.query('SELECT * FROM course', (queryErr, rows, fields) => {
//             if (queryErr) {
//               console.error('Error executing query:', queryErr);
//             } else {
//               console.log('Query results:', rows);
//             }
      
//             // Close the connection
//             connection.end();
//           });
//         });
//       });
      
// // mysql