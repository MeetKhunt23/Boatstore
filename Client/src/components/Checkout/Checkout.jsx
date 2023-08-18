import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Checkout.css";

const Checkout = () => {
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
      serCartdata(res?.data?.data);
      serProdata(res?.data.data?.product);
    }
  };

  useEffect(() => {
    cartlisiting();
  }, []);

  return (
    <div>
      <div className="cproductetail">
        <div className="ccartitems">
          {prodata.map(function (pro, index) {
            return (
              <div className="citemcard" key={index}>
                <div className="img">
                  <img src={pro.image} className="cartimg" />
                </div>
                <div className="cpinfo">
                  <span style={{ fontSize: "20px" }}>{pro.name}</span>
                  <div>
                    <span>
                      price:
                      <span style={{ color: "green" }}>
                        {pro.selling_price}&#8377;
                      </span>
                    </span>
                    <br />
                    <span>Total Quantity : {pro.quantity}</span>
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
        <div className="ctotalinfo">
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
    </div>
  );
};

export default Checkout;
