    const express = require('express');
   
    const cors = require('cors')
    const financeRoute= require('../router/Router')
    const schemas = require('../models/Models');
    const cron = require('node-cron');


// schedule to monthly to reset the ispaid of the employee
    cron.schedule('0 0 1 * *',  async()  => {
        await schemas.employee.updateMany({},{isPaid:false});
            });

    const finance= express();
    finance.use(cors());
    finance.use(express.json());
    finance.use('/api/v1',financeRoute);

 module.exports = finance;
  
      

