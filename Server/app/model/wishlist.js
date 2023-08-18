const { log } = require("console");
const sql = require("./db.js");

const wishlist=function(wishlist){
    this.user_id=wishlist.user_id;
    this.product_id=wishlist.product_id;
}

wishlist.checkallreadyexists=(user_id,product_id,result)=>{
    sql.query(`SELECT * FROM wishlist WHERE user_id=${user_id} AND product_id=${product_id}`,(err,res)=>{
        result(null,res[0])
        return;
    })
}

wishlist.removefromlist=(user_id,product_id,result)=>{
sql.query(`DELETE FROM wishlist WHERE user_id=${user_id} AND product_id=${product_id}`,(err,res)=>{
    result(null,user_id);
    return;
})
}
wishlist.addintowishlist=(wishdata,result)=>{
    // console.log(user_id); return false
    sql.query(`INSERT INTO wishlist SET ?`,[wishdata],(err,res)=>{
        // console.log(err); return false
        result(null,res.insertId);
        return;
    })
}

wishlist.getwishlistpro=(user_id,result)=>{
sql.query(`SELECT W.id,w.user_id,w.product_id,p.category_id,c.category_name,p.name as product_name,p.price,p.selling_price,p.description,p.expected_delivery_time,if(image !='',CONCAT('`+ nodeSiteUrl + `','/file/product/',image),'') AS image,p.avg_rating,p.total_review FROM wishlist as w LEFT JOIN products as p ON w.product_id=p.id LEFT JOIN categories as c ON p.category_id=c.id WHERE user_id=${user_id} order by w.id ASC`,(err,res)=>{
// console.log(res); return false
    result(null,res)
    return
})
}

wishlist.productratingExist = (user_id,product_id, result) => {
    sql.query(`SELECT id FROM product_review WHERE user_id = ${user_id} AND product_id = ${product_id}`, (err, res) => {
    result(null, res[0]);
    return;  
    });
}

wishlist.isuserexists =(user_id, result) => {
     sql.query(`SELECT id FROM users WHERE id = ${user_id}`, (err, res) => {
    result(null, res[0]);
    return;  
    });
}

wishlist.productratingExist = (user_id,product_id, result) => {
    sql.query(`SELECT id FROM product_review WHERE user_id = ${user_id} AND product_id = ${product_id}`, (err, res) => {
    result(null, res[0]);
    return;  
    });
}

wishlist.updateRating = (user_id,product_id,rating,review, result) => {
    sql.query(
      "UPDATE product_review SET user_id = ?, product_id = ?,rating = ?,review = ? WHERE product_id = ? AND user_id = ?",
      [user_id, product_id, rating, review, product_id, user_id],
      (err, res) => {
        result(null, product_id);
        return;  
      }
    );  
  };

  wishlist.getproductReviewRating = (product_id, result) => {
    sql.query(`SELECT SUM(rating) as total_rating,count(id) as total FROM product_review WHERE product_id = ${product_id}`, (err, res) => {
        // console.log(res); return false;
    result(null, res[0]);
    return;  
    });
}

wishlist.updateProductsRating = (product_id,average_rating,total, result) => {
    sql.query(
      "UPDATE products SET avg_rating = ?, total_review = ? WHERE id = ?",
      [average_rating, total, product_id],
      (err, res) => {
        result(null, product_id);
        return;  
      }
    );
  };

  wishlist.get_product = (product_id, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${product_id}`, (err, res) => {
    result(null, res[0]);
    return;  
    });
}

wishlist.reviewAdd = (newreview, result) => {
    sql.query("INSERT INTO product_review SET ?", newreview, (err, res) => {
    //   console.log(err);return false;
      result(null, res.insertId);
      return; 
    });
  };
module.exports=wishlist