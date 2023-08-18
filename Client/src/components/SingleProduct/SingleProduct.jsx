import React, { useEffect, useState } from "react";
import "./SingleProduct.scss";
import Product from "../Products/Product/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import $, { data } from "jquery";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const SingleProduct = (props) => {
  const id = useParams();
  const [productdetail, setProductdetail] = useState({});
  const [rating, setRating] = useState(0);
  console.log("rat", rating);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  console.log("rev", review);

  const Getdetail = async () => {
    var uid = localStorage.getItem("user_id");
    console.log("ID", id);
      var page = {
        user_id: uid,
        product_id: id.id,
      };
    console.log("IDD", page);
    const res = await axios.post(
      "http://localhost:3005/product/getproductdetails",
      page
    );
    console.log(res);
    if (res?.data?.success === "yes") {
      setProductdetail(res?.data?.data);
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
        Getdetail(); // this is to be in same page after clicking on wish
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
        $("#b_" + product_id).show();
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
      }
    }
  };

  const addreview = (e) => {
    var reviewdata = e.target.value;
    setReview(reviewdata);
  };

  const postreviewrating = async () => {
    var uid = localStorage.getItem("user_id");
    var rate=rating.toString();
    var data = {
      user_id:uid,
      product_id: id.id,
      rating: rate,
      review: review,
    };
    const res = await axios.post(
      "http://localhost:3005/product/post_review_rating",
      data
    );
    console.log(res);
    if(res.data.message==="Rating is required."){
      NotificationManager.error("Rating is required.");
    }
    else if(res.data.message==="Review is required."){
      NotificationManager.error("Review is required.");
    }
    else if(res?.data?.success === "yes") {
      NotificationManager.success(res.data.message);
    }
  };


  useEffect(() => {
    Getdetail();
  }, []);

  return (
    <div className="maincon">
      <div>
        <img src={productdetail.product_image} className="imgr" />
      </div>
      <div className="details">
        <div className="pdetailcon">
          <div className="pdetail">
            <h3>{productdetail.product_name}</h3>
            <h5>{productdetail.description}</h5>
            <span>
              Price:
              <span
                style={{
                  textDecoration: "line-through",
                  fontSize: "22px",
                  color: "red",
                }}
              >
                {productdetail.price}&#8377;
              </span>
            </span>
            <span>
              {" "}
              <span
                style={{ color: "green", marginLeft: "0px", fontSize: "28px" }}
              >
                {productdetail.selling_price}&#8377;
              </span>
            </span>
          </div>
          <div className="reviewrating">
            <button className="btn1">
              <span className="avgs">&#9733;</span>&nbsp;
              {productdetail.avg_ratings}
            </button>
            <button className="btn2" onClick={()=>{window.location.href = "/getreviews/" + productdetail.id;}}>
              {productdetail.total_review} Reviews
            </button>
          </div>
        </div>
        <div className="buyorwish">
          <CgShoppingCart
            style={{ fontSize: "40px" }}
            onClick={() => add_to_cart(productdetail.id)}
          />
          <a onClick={() => add_or_remove_wish(productdetail.id)}>
            {productdetail.is_favourite == 1 ? (
              <AiFillHeart
                style={{ fontSize: "40px" }}
                id={`b_${productdetail.id}`}
              />
            ) : (
              <AiOutlineHeart
                style={{ fontSize: "40px" }}
                id={`b_${productdetail.id}`}
              />
            )}
          </a>
        </div>
        <span>Your Ratings:</span>
        <div className="rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                // style={{width:"30px"}}
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <span>Your Review:</span>
        <br />
        <div className="review">
          <textarea
            placeholder="Enter Your Review of this Product Here"
            value={review}
            onChange={(e) => addreview(e)}
          ></textarea>
          <button className="subsc" onClick={() => postreviewrating()}>
            Submit
          </button>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default SingleProduct;
