module.exports = (app) => {
    
    const wishlist = require("../controller/wishlist.js");
    app.post("/add_or_remove_wishlist", wishlist.add_or_remove_wishlist);
    app.post("/getwishlist", wishlist.getwishlist);
  };