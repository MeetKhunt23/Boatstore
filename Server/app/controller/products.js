const product = require("../model/products.js");
const moment = require("moment");

exports.getproductListing = async (req, res) => {
  const { user_id,page } = req.body;

  var uid = 0;

  if(user_id!=undefined && user_id!=""){
    uid=user_id;
  }

  var pages = page;
  var limit = "4";
  if (pages == "") {
    pages = 1;
    sp = 0;
  } else {
    pages = pages;
    sp = (pages - 1) * limit;
  }

  await product.getproductcount((err, alldata) => {
    if (alldata.length > 0) {
      var getcount = alldata.length;
      // console.log(getcount); return false
      var totalpage = Math.ceil(getcount / limit);
      product.getproductsbypage(uid,sp, limit, (err, pdata) => {
        if (pdata.length > 0) {
          var newcats = [];
          pdata.forEach(function (pro) {
            var obj = {};
            obj["id"] = pro.id;
            obj["product_key"] = pro.product_key;
            obj["category_id"] = pro.category_id;
            obj["category_name"] = pro.category_name;
            obj["product_name"] = pro.name;
            obj["price"] = pro.price;
            obj["selling_price"] = pro.selling_price;
            obj["description"] = pro.description;
            obj["avg_ratings"] = pro.avg_ratings;
            obj["total_review"] = pro.total_review;
            obj["expected_delivery_time"] = pro.expected_delivery_time;
            obj["product_image"] = pro.image;
            obj["is_favourite"]=pro.is_favourite
            newcats.push(obj);
          });

          return res.send({
            success: "yes",
            message: "here are all products available",
            data: newcats,
            total_page: totalpage,
            page: pages,
          });
        } else {
          return res.send({
            success: "no",
            message: "no data",
            data: [],
          });
        }
      });
    }
  });
};

exports.getproductdetails = async (req, res) => {
  const { user_id,product_id } = req.body;

  let error = "";
  if (!product_id) {
    error = "Product id is required.";
  }else if(!user_id){
    error = "user id is required.";
  }

  await product.getproductDetail(user_id,product_id, (err, prodata) => {
    // console.log(obj); return false
    if (prodata) {
      var obj = {};
      obj["id"] = prodata.id;
      obj["category_id"] = prodata.category_id;
      obj["category_name"] = prodata.category_name;
      obj["product_name"] = prodata.name;
      obj["product_image"] = prodata.image;
      obj["price"] = prodata.price;
      obj["selling_price"] = prodata.selling_price;
      obj["description"] = prodata.description;
      obj["avg_ratings"] = prodata.avg_rating;
      obj["total_review"] = prodata.total_review;
      obj["expected_delivery_time"] = prodata.expected_delivery_time;
      obj["is_favourite"]=prodata.is_favourite

      return res.send({
        success: "yes",
        message: "here is all your product details",
        data: obj,
      });
    } else {
      return res.send({
        success: "no",
        message: "no data",
        data: [],
      });
    }
  });
};

exports.getproductreview = async (req, res) => {
  const { product_id } = req.body;
  let errors = "";
  if (!product_id) {
    errors = "product_id is required.";
  }

  product.getproduct_review(product_id, (err, rdata) => {
    // console.log(rdata.length); return false
    if (rdata.length > 0) {
      var allrev = [];
      rdata.forEach(function (row) {
        var obj = {};
        obj["review_id"] = row.id;
        obj["user_id"] = row.user_id;
        obj["user_name"] = `${row.first_name} ${row.last_name}`;
        obj["product_id"] = row.product_id;
        obj["product_name"] = row.name;
        obj["review"] = row.review;
        obj["rating"] = row.rating;
        let now=moment(row.create_date);
        var posted_at=now.format("DD-MM-YYYY")
        // console.log(posted_at); return false
        obj["posted_at"] = posted_at;
        allrev.push(obj);
      });
      return res.send({
        success: "yes",
        message: "here are all your product reviews",
        data: allrev,
      });
    } else {
      return res.send({
        success: "no",
        message: "no data reviews found in this product",
        data: [],
      });
    }
  });
};
