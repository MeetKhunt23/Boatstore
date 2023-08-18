const sql = require("./db.js");

const product = function(product) {
    this.product_key = product.product_key;
    this.category_id = product.category_id;
    this.name = product.name;
    this.image = product.image;
    this.price = product.price;
    this.selling_price = product.selling_price;
    this.description = product.	description;
    this.avg_ratings = product.avg_ratings;
    this.total_review = product.total_review;
    this.expected_delivery_time = product.expected_delivery_time;
  };

  product.getproductsbypage=(uid,sp,limit,result)=>{
    strlimit="";
    // console.log(sp,limit); return false
    if(sp!=='' && limit!==''){
        var strlimit = " LIMIT " + sp + "," + limit + "";
    }
    sql.query(`SELECT p.id,p.product_key,p.category_id,c.category_name,p.name,p.price,p.selling_price,p.description,p.avg_rating,p.total_review,p.expected_delivery_time,if(image !='',CONCAT('`+ nodeSiteUrl + `','/file/product/',image),'') AS image,if((SELECT COUNT(id) FROM wishlist as w WHERE w.product_id=p.id AND user_id=${uid})>0,1,0) as is_favourite FROM products as p LEFT JOIN categories as c ON p.category_id=c.id`+ strlimit,(err,res)=>{
        // console.log(res); return false
        if (res == undefined) {
            result(null, []);
            return;
          } else {
            result(null, res);
            return;
          }
    })
  }

  product.getproductcount=(result)=>{
    sql.query("SELECT * FROM products",(err,res)=>{
        // console.log(res ); return false
        result(null,res);
        return
    })
  }

  product.getproductDetail=(user_id,product_id,result)=>{
    sql.query(`SELECT p.id,p.category_id,c.category_name,p.name,if(image !='',CONCAT('`+ nodeSiteUrl + `','/file/product/',image),'') AS image,p.price,p.selling_price,p.description,p.avg_rating,p.total_review,p.expected_delivery_time,if((SELECT COUNT(id) FROM wishlist as w WHERE w.product_id=p.id AND w.user_id=${user_id})>0,1,0) as is_favourite FROM products as p LEFT JOIN categories as c ON p.category_id=c.id WHERE p.id=${product_id}`,(err,res)=>{
        // console.log(err); return false
        result(null,res[0]);
        return;
    })
  }

  product.getproduct_review=(product_id,result)=>{
    sql.query(`SELECT r.id,r.user_id,r.product_id,r.rating,r.review,u.first_name,r.create_date,u.last_name,p.id,p.name FROM product_review as r LEFT JOIN users as u ON r.user_id=u.id LEFT JOIN products as p ON r.product_id=p.id WHERE r.product_id=${product_id}`,(err,res)=>{
        // console.log(res); return false;
        result(null,res);
        return;
    })
  }

  product.get_product_detail=(user_id,product_id,result)=>{
    sql.query(`SELECT p.id as product_id,p.category_id,p.name,p.image,p.price,p.selling_price,p.description,p.avg_rating,p.total_review,p.expected_delivery_time ,if((SELECT COUNT(id) FROM cart WHERE product_id = p.id AND user_id= ${user_id})>0,1,0) as is_added_cart,if((SELECT COUNT(id) FROM wishlist WHERE product_id = p.id AND user_id= ${user_id})>0,1,0) as is_favourite from products as p WHERE 1=1 AND (CAST(p.id AS CHAR) = ? OR p.product_key= ?)`,[product_id,product_id],(err,res)=>{
      // console.log(err); return false;
        result(null, res[0]);
        return; 
    })
}
  module.exports=product;

