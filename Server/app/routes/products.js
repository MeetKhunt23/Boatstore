module.exports=app=>{
    const products=require("../controller/products.js");
    const cart=require("../controller/cart.js")
  app.post("/product/getproductListing", products.getproductListing);
  app.post("/product/getproductdetails", products.getproductdetails);
  app.post("/product/getproductreview", products.getproductreview);
  app.post("/product/addtocart", cart.addtocart);
  app.post("/product/change_product_quantity", cart.change_product_quantity);
  app.post("/product/remove_product_from_cart", cart.remove_product_from_cart);
  app.post("/product/cart_listing", cart.cart_listing);
  app.post("/product/post_review_rating", cart.post_review_and_rating);

}   