const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const formatDate = require('./formatDate');
require('dotenv').config();


const port = process.env.PORT;
const app = express();
const baseURL = 'https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus';


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/', (request,response)=> {
    response.sendFile('./index.html');
});


app.post('/', async (request,response)=> {
    const {queryResult} = request.body;

    const orderId = queryResult.parameters.o2;

    const result = await axios.post(baseURL, {orderId: orderId});

    var shipmentDate = result.data.shipmentDate;
    shipmentDate = formatDate(shipmentDate);
    console.log(shipmentDate);

    const res = {
        fulfillmentText: `Your order ${orderId} will be shipped on ${shipmentDate}`,
        fulfillmentMessages: [{ 
            text: {
                text: [`Your order ${orderId} will be shipped on ${shipmentDate}, please wait a while!`]
            },
        }]
    };

    response.json(res);
});


app.listen(port || 3000);