const sql = require("./db.js");

//constructor
const state=function(state){
    this.name=country.name;
    this.country_id=country.country_id;
}

state.getallstates=(country_id,result)=>{
    var swhere='';
    if(country_id !=''){ 
        swhere=`WHERE country_id =${country_id}`;
    }
    sql.query(`SELECT id,name,country_id FROM states ${swhere}`,(err,res)=>{
        result(null,res)
        return;
    })

}


module.exports=state;