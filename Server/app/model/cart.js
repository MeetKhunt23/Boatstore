const { log } = require("util");
const sql = require("./db.js");

const Cart = function (cart) {
  this.user_id = cart.user_id;
  this.product_id = cart.product_id;
  this.price = cart.price;
  this.selling_price = cart.selling_price;
  this.quantity = cart.quantity;
  this.total_price = cart.total_price;
};

// Cart.addtocart=()
Cart.checkexistincart = (user_id, product_id, result) => {
  sql.query(
    `SELECT id,quantity,price FROM cart WHERE product_id = ${product_id} AND user_id = ${user_id}`,
    (err, res) => {
      result(null, res[0]);
      return;
    }
  );
};

Cart.updateCart = (
  cart_quantity,
  total_price,
  selling_price,
  price,
  user_id,
  product_id,
  result
) => {
  sql.query(
    "UPDATE cart SET quantity = ?, total_price = ?, price = ?, selling_price = ? WHERE user_id = ? AND product_id = ?",
    [cart_quantity, total_price, price, selling_price, user_id, product_id],
    (err, res) => {
      result(null, product_id);
      return;
    }
  );
};

Cart.cartAdd = (newCart, result) => {
  sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
    // console.log(res); return false
    result(null, res.insertId);
    return;
  });
};

Cart.remove = (id, result) => {
  sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
    result(null, res);
  });
};

Cart.cart_listing = (user_id, result) => {
  sql.query(
    `SELECT u.first_name,u.last_name,u.mobile as phone_number,u.email,a.id, a.address_one, a.address_two, a.city,a.state,a.country,a.pincode, a.latitude, a.longitude
    FROM users as u LEFT JOIN addresses as a ON u.address_id = a.id
    WHERE u.id = ${user_id} GROUP BY u.id`,
    (err, data) => {
        // console.log(data); return false
      var returnArray = {};
      if (data[0]) {
        var row = data[0];
        returnArray["address_id"] = row.id;
        returnArray["address_one"] = row.address_one;
        returnArray["address_two"] = row.address_two;
        returnArray["city"] = row.city;
        returnArray["state"] = row.state;
        returnArray["country"] = row.country;
        returnArray["pincode"] = row.pincode;
        returnArray["latitude"] = row.latitude;
        returnArray["longitude"] = row.longitude;
        returnArray["full_name"] = `${row.first_name} ${row.last_name}`;
        returnArray["phone_number"] = row.phone_number;
        returnArray["email"] = row.email;
      } else {
        returnArray["address_id"] = "";
        returnArray["address_one"] = "";
        returnArray["address_two"] = "";
        returnArray["city"] = "";
        returnArray["state"] = "";
        returnArray["country"] = "";
        returnArray["pincode"] = "";
        returnArray["latitude"] = "";
        returnArray["longitude"] = "";
        returnArray["full_name"] = "";
        returnArray["phone_number"] = "";
        returnArray["email"] = "";
      }

      sql.query(
        `SELECT free_homedelivery_on_amount,shipping_charge FROM admin LIMIT 1`,
        (err, fhddata) => {
            // console.log(fhddata); return false
          var DeliverRow = fhddata[0];
          var grand_total = 0;

          sql.query(
            `SELECT c.id,c.product_id, c.user_id, c.price, c.quantity, c.total_price, p.name,
            if(image !='',CONCAT('` +
              nodeSiteUrl +
              `','/file/product/',image),'') AS image, p.expected_delivery_time,c.selling_price
            FROM cart c LEFT JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ${user_id} GROUP BY p.id`,
            (err, products) => {
              if (products.length > 0) {
                var newCats = [];
                proData = products;
                var total = 0;
                var product_count = 0;
                proData.forEach(function (pro) {
                  var obj = {};
                  obj["id"] = pro.id;
                  obj["product_id"] = pro.product_id;
                  obj["name"] = pro.name;
                  obj["price"] = pro.price;
                  obj["selling_price"] = pro.selling_price;
                  obj["quantity"] = pro.quantity;
                  obj["image"] = pro.image;                    
                  obj["total_price"] = pro.total_price;
                  obj["expected_delivery_time"] = pro.expected_delivery_time;
                  total += pro.total_price;
                  product_count += pro.quantity;
                  newCats.push(obj);
                });

                returnArray["product"] = newCats;
                returnArray["free_homedelivery_on_amount"] =
                  DeliverRow.free_homedelivery_on_amount;

                if (total >= DeliverRow.free_homedelivery_on_amount) {
                  returnArray["shipping_charge"] = 0;
                  returnArray["total_amount"] = total;
                } else {
                  if (total > 0) {
                    returnArray["shipping_charge"] = DeliverRow.shipping_charge;
                    returnArray["total_amount"] =
                      total + DeliverRow.shipping_charge;
                  } else {
                    returnArray["shipping_charge"] = 0;
                    returnArray["total_amount"] = 0;
                  }
                }

                grand_total += returnArray["total_amount"];
                returnArray["product_count"] = product_count;
              } else {
                returnArray["product"] = [];
              }

              returnArray["grand_total"] = grand_total;

              result(null, returnArray);
              return;
            }
          );
        }
      );
    }
  );
};

module.exports = Cart;
