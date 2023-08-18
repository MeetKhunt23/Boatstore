const sql = require("./db.js");

//constructor
const city=function(city){
    this.name=city.name;
    this.state_id=country.state_id;
}

city.getcitylist=(state_id,result)=>{
    var stateid='';
    if(state_id!=''){
        stateid=`WHERE state_id=${state_id}`;
    }

    sql.query(`SELECT id,name,state_id FROM cities ${stateid}`,(err,res)=>{
        // console.log(res); return false
        result(null,res)
        return;
    })
}

module.exports=city;