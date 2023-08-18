const sql = require("./db.js");

//constructor
const country=function(country){
    this.sortname=country.sortname;
    this.name=country.name;
}

country.getallCountryd=(result)=>{
    sql.query("SELECT id,name FROM countries",(err,res)=>{
        // console.log(res); return false
        result(null,res);
        return;
    })
}



module.exports=country;