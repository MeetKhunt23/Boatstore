module.exports=app=>{
    const adress=require("../controller/adress");
  app.get("/address/country", adress.getallcountry);
  app.post("/address/states", adress.getallstates);
  app.post("/address/city", adress.getallcities);
}