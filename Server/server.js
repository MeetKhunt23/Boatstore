const express=require('express');
const body_parser=require('body-parser');
const file=require("./app/routes/file.js");
const cors = require("cors")
const App=express();
global.nodeSiteUrl = 'http://localhost:3005'

App.use(cors())
App.use(body_parser.json());
App.use(body_parser.urlencoded({extended:true}));

App.get('/',(req,res)=>{
    res.send({message:"Heyy there i am again trying to make all Api's."})
})

require("./app/routes/category.js")(App);
require("./app/routes/users.js")(App);
require("./app/routes/address.js")(App);
require("./app/routes/products.js")(App);
require("./app/routes/wishlist.js")(App);

App.use("/file",file);
const port=process.env.port || 3005;
App.listen(port,()=>{
    console.log(`you are running on ${port}.`)
})
