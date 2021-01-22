
//const mongoose = require('mongoose');//third party --for connecting with mongodb
const express = require('express');//third party
const bodyParser =require('body-parser');//core module







const db=require('./db/db');
const bus_route=require('./routes/bus_route');
const user_route=require('./routes/user_route');
const app=express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));


app.use(bus_route);

app.use(user_route);
//const data=new User({username:'Singh',address:'Patan'})
//data.save();



app.listen(90);