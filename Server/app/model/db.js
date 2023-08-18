const mysql=require('mysql')
const config=require("../config/db.config.js");

var connection=mysql.createPool({
    host:config.HOST,
    user:config.USER,
    password:config.PASSWORD,
    database:config.DB
})

module.exports=connection;