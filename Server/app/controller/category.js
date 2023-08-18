const Category=require('../model/category.js');

exports.allCategory=(req,res)=>{
    Category.allCategory((err,data)=>{
        var newCats = [];
        catData = data;
        catData.forEach(function(data){
          var obj ={};
          obj['id'] = data.id; 
          obj['name'] = data.category_name; 
          obj['image'] = data.category_image; 
          newCats.push(obj);      
        });

        return res.send({
            success:"yes",
            message: "",
            data: newCats
       });
    })
}
