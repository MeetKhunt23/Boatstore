module.exports=app=>{
    const category=require("../controller/category.js");
  app.get("/category/allCategory", category.allCategory);
  
}