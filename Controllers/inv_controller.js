/* Thank you  Lord Jesus Christ  🙏🙏🙏 */
/* author Feyisa Kenenisa */

const path         = require('path');
const fs           = require('node:fs');  

exports.inventorySearch = (req,res)=>{
    console.log('fuck you test');
    console.log(req.query.query);
    try{

        //update enviroment variable from 0 to 1
        const filePath = './inventory/Controllers/testdata.json';
        // Step 1: Read the file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading the file: ${err}`);
                res.send('opps');
                return;
            }
            const books = JSON.parse(data);
          

              let bookName = [];
  
               books.forEach(dat => {
                    if (dat.id == req.query.query){
                        bookName.push({Title:dat.title,id:dat.id});
                    }
                
              });

            console.log(bookName);

            res.send(JSON.stringify(bookName));

        });
    }
    catch{
        res.status(404).send("oops");
    }
}

  /* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
