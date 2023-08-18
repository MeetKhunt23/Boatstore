const wishlist = require("../model/wishlist.js");

exports.add_or_remove_wishlist = (req, res) => {
  const { user_id, product_id } = req.body;
  // console.log(req.body); return false

  let errors = "";
  if (!user_id) {
    errors = "user id is required.";
  } else if (!product_id) {
    errors = "product id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  wishlist.checkallreadyexists(user_id, product_id, (err, data) => {
    if (data) {
      wishlist.removefromlist(user_id, product_id, (err, data) => {
        var returnobj={};
        returnobj['is_favourite']=0
        return res.send({
          success: "yes",
          message: "Product removed from wishlist successfully.",
          data: returnobj,
        });
      });
    } else {
      const objdata = new wishlist({
        user_id: user_id,
        product_id: product_id,
      });
      wishlist.addintowishlist(objdata, (err, data) => {
        var returnobj={};
        returnobj['is_favourite']=1
        if (data) {
          return res.send({
            success: "yes",
            message: "Product added in wishlist successfully.",
            data: returnobj,
          });
        } else {
          return res.send({
            success: "no",
            message: "Something went wrong.",
            data: [],
          });
        }
      });
    }
  });
};

exports.getwishlist=(req,res)=>{
    const{user_id}=req.body;
    let errors = "";
    if (!user_id) {
      errors = "user id is required.";
    } 
    if (errors.length > 0) {
      return res.send({
        success: "no",
        message: errors,
        data: [],
      });
    }

    wishlist.getwishlistpro(user_id,(err,data)=>{
        if(data){
            return res.send({
                success: "yes",
                message: "Here is Your Wishlist",
                data: data,
              });
        }
        else{
            return res.send({
                success: "no",
                message: "wishlist is empty.",
                data: [],
              });
        }
    })
}
