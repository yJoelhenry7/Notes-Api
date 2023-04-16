const express = require('express');
const sequelize = require('sequelize');
const app = express();
const PORT = process.env.PORT || 8080;
const router = require('./routes/dataRouter');

// MiddleWares

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
app.use('/',router);


app.listen(PORT,'localhost',()=>{
    console.log(`Server is up and running at ${PORT}`);
})