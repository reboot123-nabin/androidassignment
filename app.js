
//const mongoose = require('mongoose');//third party --for connecting with mongodb
const express = require('express');//third party
const bodyParser =require('body-parser');//core module







const db=require('./db/db');
const bus_route=require('./routes/bus_route');
const user_route=require('./routes/user_route');
const comment_route=require('./routes/commentRoute');
const location_route=require('./routes/locationRoute');
const information_route=require('./routes/information_route');
const description_route=require('./routes/description_route');
const app=express();
const path =  require('path');
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(information_route);
app.use(bus_route);
app.use(comment_route);
app.use(user_route);
app.use(description_route);
app.use(location_route);
app.use('/',express.static(path.join(__dirname, 'files')))
//const data=new User({username:'Singh',address:'Patan'})
//data.save();



app.listen(3000);