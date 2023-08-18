import { useEffect, useState } from "react";
import "./Cart.scss";
import axios from "axios";

const Cart = () => {
  const [cartdata, serCartdata] = useState({});
  const [prodata, serProdata] = useState([]);
  console.log("pro", prodata);

  const cartlisiting = async () => {
    var uid = localStorage.getItem("user_id");
    // console.log(uid);
    var data = {
      user_id: uid,
    };

    const res = await axios.post(
      "http://localhost:3005/product/cart_listing",
      data
    );

    if (res?.data?.success === "yes") {
      console.log("cart", res);
      //   console.log("heyy");
      serCartdata(res?.data?.data);
      serProdata(res?.data.data?.product);
    }
  };

  const addqty = async (product_id, quantity) => {
    var uid = localStorage.getItem("user_id");
    var addquantity = Number(quantity) + 1;
    var data = {
      user_id: uid,
      product_id: product_id,
      quantity: addquantity,
    };

    const res = await axios.post(
      "http://localhost:3005/product/change_product_quantity",
      data
    );

    if (res?.data?.success === "yes") {
      console.log("cart", res);
      cartlisiting();
    }
  };

  const removelast = async () => {
    var uid = localStorage.getItem("user_id");
    // console.log(uid);
    var data = {
      user_id: uid,
    };

    const res = await axios.post(
      "http://localhost:3005/product/cart_listing",
      data
    );

    if (res?.data?.success === "no") {
      window.location.reload();
    }
  };
  const decreaseqty = async (product_id, quantity) => {
    var uid = localStorage.getItem("user_id");
    if (quantity > 1) {
      var decquantity = Number(quantity) - 1;
      var data = {
        user_id: uid,
        product_id: product_id,
        quantity: decquantity,
      };

      const res = await axios.post(
        "http://localhost:3005/product/change_product_quantity",
        data
      );

      if (res?.data?.success === "yes") {
        cartlisiting();
      }
    } else if (quantity == 1) {
      // window.confirm("Are you Sure You Want to delete this product from cart?");
      
      var data = {
        user_id: uid,
        product_id: product_id,
      };

      const res = await axios.post(
        "http://localhost:3005/product/remove_product_from_cart",
        data
      );

      if (res?.data?.success === "yes") {
        // window.location.reload();
        cartlisiting();
        removelast();
      }
    }
  };

  useEffect(() => {
    cartlisiting();
  }, []);

  return (
    <>
      {!prodata.length ? (
        <div
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            color: "grey",
          }}
          id="emptyw"
        >
          Cart Is Empty.
          <button
            style={{
              width: "150px",
              fontSize: "15px",
              marginTop: "20px",
              position: "relative",
              right: "65px",
              backgroundColor: "orange",
              border: "none",
              padding: "10px 10px",
              color: "white",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="personal-detail">
            <h4>Heyy {cartdata.full_name}..!!..Have a Great Day</h4>
          </div>
          <div className="productetail">
            <div className="cartitems">
              {prodata.map(function (pro, index) {
                return (
                  <div className="itemcard" key={index}>
                    <div className="img">
                      <img src={pro.image} className="cartimg" />
                    </div>
                    <div className="pinfo">
                      <span style={{ fontSize: "20px" }}>{pro.name}</span>
                      <div>
                        <span>
                          price:
                          <span style={{ color: "green" }}>
                            {pro.selling_price}&#8377;
                          </span>
                        </span>
                        <br />
                        <br />
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <button
                                  className="cb"
                                  onClick={() =>
                                    decreaseqty(pro.product_id, pro.quantity)
                                  }
                                >
                                  -
                                </button>
                              </td>
                              <td className="quant">
                                <span>{pro.quantity}</span>
                              </td>
                              <td>
                                <button
                                  className="cb"
                                  onClick={() =>
                                    addqty(pro.product_id, pro.quantity)
                                  }
                                >
                                  +
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <span>
                          Total price:
                          <span style={{ color: "green" }}>
                            {pro.total_price}&#8377;
                          </span>
                        </span>
                        <br />
                        <span>
                          Expected Delivery in {pro.expected_delivery_time}.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="totalinfo">
              <h5 style={{ textAlign: "center", marginBottom: "20px" }}>
                TOTAL PAYABLE AMOUNT
              </h5>
              <div className="totalqty">
                <div style={{ marginRight: "30px" }}>Total Qty.:</div>
                <div>{cartdata.product_count}</div>
              </div>
              <div className="totalam">
                <div style={{ marginRight: "30px" }}>Sub Total:</div>
                <div>{cartdata.total_amount}&#8377;</div>
              </div>
              <div className="totalam1">
                <div>Shipping Charge:</div>
                <div>{cartdata.shipping_charge}&#8377;</div>
              </div>
              <div className="gtotal">
                <div>Grand Total</div>
                <div>{cartdata.grand_total}&#8377;</div>
              </div>
              <div>
                <button
                  className="checkoutbtn"
                  onClick={() => {
                    window.location.href = "/checkout";
                  }}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
