const sql = require("./db.js");

const Category = function(category) {
    this.category_name = category.category_name;
    this.category_image = category.category_image;
  };

  Category.allCategory = result => {
    sql.query(`SELECT id,category_name,CONCAT('` +
    nodeSiteUrl +
    `','/file/category/',category_image) as category_image FROM categories ORDER BY category_name ASC`, (err, res) => {
        // console.log(res); return false
    result(null, res);
    return;  
    });
  };

  module.exports=Category;