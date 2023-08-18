import "./Product.scss";
import React, { useState, useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import $, { data } from "jquery";
import Pagination from "react-js-pagination";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Product = (props) => {
  console.log("id", props.is_favourite);
  const [addedinlist, setAddedinlist] = useState(false);
  // const [isfav, setIsfav] = useState(0);
  const [productlist, setProductlist] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pagetotal, setPagetotal] = useState({});
  const [activepage, setActivepage] = useState(1);

  const newproductimages = async (pageNumber) => {
    console.log("page", pageNumber);
    setActivepage(pageNumber);
    var user_id = localStorage.getItem("user_id")
      ? localStorage.getItem("user_id")
      : "";
    var page = {
      user_id: user_id,
      page: pageNumber ? pageNumber : "1",
    };
    console.log(page);
    const res = await axios.post(
      "http://localhost:3005/product/getproductListing",
      page
    );
    console.log(res);
    if (res?.data?.success === "yes") {
      setProductlist(res?.data?.data);
      setPagination(res?.data?.page);
      setPagetotal(res?.data?.total_page);
    }
  };

  const add_or_remove_wish = async (product_id) => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      var uid = localStorage.getItem("user_id");
      $("#b_" + product_id).hide();

      // alert(`${product_id}`)
      var data = {
        user_id: uid,
        product_id: product_id,
      };
      const res = await axios.post(
        "http://localhost:3005/add_or_remove_wishlist",
        data
      );
      console.log(res);
      if (res?.data?.success === "yes") {
        newproductimages(pagination); // this is to be in same page after clicking on wish
        if (res?.data?.message === "Product added in wishlist successfully.") {
          NotificationManager.success(
            "Product added in wishlist successfully."
          );
        } else if (
          res?.data?.message === "Product removed from wishlist successfully."
        ) {
          NotificationManager.success(
            "Product removed from wishlist successfully."
          );
        }
        setTimeout(function () {
          $("#b_" + product_id).show();
        }, 1000);
      }
    }
  };

  const add_to_cart = async (product_id) => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      var uid = localStorage.getItem("user_id");

      var data = {
        user_id: uid,
        product_id: product_id,
        quantity: "1",
      };

      const res = await axios.post(
        "http://localhost:3005/product/addtocart",
        data
      );

      if (res?.data?.success === "yes") {
        NotificationManager.success("Product added in Cart successfully.");
        // window.location.reload();
        // newproductimages(pagination); // this is to be in same page after clicking on wish
      }
    }
  };

  useEffect(() => {
    newproductimages();
  }, []);

  return (
    <>
      <div className="cards">
        {productlist.map((pro, index) => (
          <div className="product-card">
            <div className="thumbnail">
              <img
                src={pro.product_image}
                alt=""
                onClick={() => {
                  window.location.href = "/getproductdetails/" + pro.id;
                }}
              />
            </div>
            <div
              className="product-details"
              style={{
                alignItems: "center",
                alignContent: "center",
                marginLeft: "20px",
              }}
            >
              <span className="name">{pro.product_name}</span>
              <span className="price">
                <div
                  style={{
                    textDecoration: "line-through",
                    fontSize: "18px",
                    color: "red",
                  }}
                >
                  {pro.price}&#8377;
                </div>
                <span
                  style={{
                    color: "green",
                    marginLeft: "0px",
                    fontSize: "22px",
                  }}
                >
                  {pro.selling_price}&#8377; Only.
                </span>
              </span>
              <span
                style={{
                  marginLeft: "70px",
                  position: "relative",
                  bottom: "10px",
                  color:"purple"
                }}
              >
                <a onClick={() => add_or_remove_wish(pro.id)}>
                  {pro.is_favourite == 1 ? (
                    <AiFillHeart
                      style={{ fontSize: "35px", cursor: "pointer" }}
                      id={`b_${pro.id}`}
                    />
                  ) : (
                    <AiOutlineHeart
                      style={{ fontSize: "35px", cursor: "pointer" }}
                      id={`b_${pro.id}`}
                    />
                  )}
                </a>
                <CgShoppingCart
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => add_to_cart(pro.id)}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        onChange={(e) => newproductimages(e)}
        activePage={activepage}
        itemsCountPerPage={4}
        totalItemsCount={pagetotal * 4}
        pageRangeDisplayed={pagetotal}
        itemClass="page-item"
        linkClass="page-link"
      />
      <NotificationContainer />
    </>
  );
};

export default Product;
