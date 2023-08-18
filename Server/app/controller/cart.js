const Cart = require("../model/cart.js");
const product = require("../model/products.js");
var empty = require("is-empty");
const Wishlist=require("../model/wishlist.js")

exports.addtocart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "User id is required.";
  } else if (!product_id) {
    errors = "Product id is required.";
  } else if (!quantity) {
    errors = "Quantity is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  product.get_product_detail(user_id, product_id, (err, pdata) => {
    Cart.checkexistincart(user_id, product_id, (err, cdata) => {
      if (cdata) {
        var cart_quantity = Number(cdata.quantity) + Number(quantity);

        if (pdata.selling_price > 0) {
          var total_price = Number(pdata.selling_price) * cart_quantity;
        } else {
          var total_price = Number(pdata.price) * cart_quantity;
        }

        Cart.updateCart(
          cart_quantity,
          total_price,
          pdata.selling_price,
          pdata.price,
          user_id,
          product_id,
          (err, updata) => {
            return res.send({
              success: "yes",
              message: "Product added to cart successfully.",
              data: [],
            });
          }
        );
      } else {
        if (pdata.selling_price > 0) {
          var total_price = Number(pdata.selling_price) * Number(quantity);
        } else {
          var total_price = pdata.price * Number(quantity);
        }

        //   console.log(pdata); return false;
        const cartData = new Cart({
          user_id: user_id,
          product_id: product_id,
          total_price: total_price,
          price: pdata.price,
          selling_price: pdata.selling_price,
          quantity: quantity,
        });

        Cart.cartAdd(cartData, (err, data) => {
          return res.send({
            success: "yes",
            message: "Product added to cart successfully.",
            data: [],
          });
        });
      }
    });
  });
};

exports.change_product_quantity = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "User id is required.";
  } else if (!product_id) {
    errors = "Product id is required.";
  } else if (!quantity) {
    errors = "Quantity is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  await product.getproductDetail(user_id,product_id, (err, product) => {
    Cart.checkexistincart(user_id, product_id, (err, cart) => {
      if (cart) {
        var cart_quantity = quantity;

        if (product.selling_price > 0) {
          var total_price = Number(product.selling_price) * cart_quantity;
        } else {
          var total_price = Number(product.price) * cart_quantity;
        }

        Cart.updateCart(
          cart_quantity,
          total_price,
          product.selling_price,
          product.price,
          user_id,
          product_id,
          (err, updata) => {
            return res.send({
              success: "yes",
              message: "Quantity updated successfully.",
              data: [],
            });
          }
        );
      } else {
        return res.send({
          success: "no",
          message: "Product not exist in cart.",
          data: [],
        });
      }
    });
  });
};

exports.remove_product_from_cart = async (req, res) => {
  const { user_id, product_id } = req.body;

  let errors = "";
  if (!user_id) {
    errors = "User id is required.";
  } else if (!product_id) {
    errors = "Product id is required.";
  }
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  await Cart.checkexistincart(user_id, product_id, (err, cart) => {
    if (cart) {
      Cart.remove(cart.id, (err, data1) => {
        return res.send({
          success: "yes",
          message: "Product remove from cart successfully.",
          data: "",
        });
      });
    } else {
      return res.send({
        success: "no",
        message: "Can not remove",
        data: [],
      });
    }
  });
};

exports.cart_listing=async(req,res)=>{
    const { user_id } = req.body;

    let errors = "";
    if (!user_id) {
      errors = "User id is required.";
    }
    if (errors.length > 0) {
      return res.send({
        success: "no",
        message: errors,
        data: [],
      });
    }

     await Cart.cart_listing(user_id, (err, cart) => {
    if (empty(cart.product)) {
      return res.send({
        success: "no",
        message: "No products added in cart yet",
        data: req.body,
      });
    } else {
      return res.send({
        success: "yes",
        message: "",
        data: cart,
      });
    }
  });
}

exports.post_review_and_rating=async(req,res)=>{
  const { user_id, product_id, rating, review } = req.body;

  let errors = "";

  if (!user_id) {
    errors = "User id is required.";
  } else if (!product_id) {
    errors = "Product id is required.";
  } else if (!rating) {
    errors = "Rating is required.";
  } else if (!review) {
    errors = "Review is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  await Wishlist.isuserexists(user_id,(err,userdata)=>{
    if(userdata){
      // console.log(userdata); return false
      Wishlist.productratingExist(user_id, product_id,(err,prdata)=>{
        if(prdata){
          Wishlist.updateRating( user_id,
            product_id,
            rating,
            review,(err,upprdata)=>{
              Wishlist.getproductReviewRating(product_id,(err,reviewdata)=>{
                if (reviewdata) {
                  var total_rating = reviewdata.total_rating;
                  var total = reviewdata.total;
                  // console.log(total); return false
                } else {
                  var total_rating = 0;
                  var total = 0;
                }

                var average_rating = Number(total_rating / total);
                Wishlist.updateProductsRating(product_id,
                  average_rating,
                  total,(err,updatedata)=>{
                    var rating_id = prdata.id;

                    Wishlist.get_product(product_id,(err,product)=>{
                      var obj = {};
                      obj["rating_id"] = rating_id;
                      obj["avg_rating"] = product.avg_rating;
                      obj["total_review"] = product.total_review;

                      return res.send({
                        success: "yes",
                        message: "Rating added successfully.",
                        data: obj,
                      });
                    })
                  

                  })
              })
            })
        }
        else{
          const reviewData = new Wishlist({
            user_id: user_id,
            product_id: product_id,
            rating: rating,
            review: review,
        })

        Wishlist.reviewAdd(reviewData,(err,reviewdata)=>{
          Wishlist.getproductReviewRating(product_id,(err,review)=>{
            if (review) {
              var total_rating = review.total_rating;
              var total = review.total;
            } else {
              var total_rating = 0;
              var total = 0;
            }
            var average_rating = Number(total_rating / total);
            Wishlist.updateProductsRating(
              product_id,
              average_rating,
              total,(err, updata)=>{
                var rating_id = reviewdata.id;
                Wishlist.get_product(product_id,(err,product)=>{
                  var obj = {};
                  obj["rating_id"] = rating_id;
                  obj["avg_rating"] = product.avg_rating;
                  obj["total_review"] = product.total_review;

                  return res.send({
                    success: "yes",
                    message: "Rating added successfully.",
                    data: obj,
                  });
                })

              })
          })
        })
      }
    })
    }
    else{
      return res.send({
        success: "no",
        message: "Invalid user id.",
        data: [],
      });
    }
  })
}
