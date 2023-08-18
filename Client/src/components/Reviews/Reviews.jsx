import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IdealBankElement } from "@stripe/react-stripe-js";
import "./Reviews.css";
import StarRatingComponent from "react-rating-stars-component";

const Reviews = () => {
  const id = useParams();
  const [reviews, setReviews] = useState([]);

  console.log("rev", reviews);
  const getreviews = async () => {
    var data = {
      product_id: id.id,
    };
    const res = await axios.post(
      "http://localhost:3005/product/getproductreview",
      data
    );
    if (res?.data?.success === "yes") {
      setReviews(res.data.data);
    }
  };

  useEffect(() => {
    getreviews();
  }, []);

  return (
    <div>
      {reviews.map(function (pro, index) {
        return (
          <div key={index} className="reviewcontainer">
            <div>
              <span style={{ fontSize: "25px", textTransform: "uppercase" }}>
                {index + 1}.{pro.user_name}
              </span>
              <br />
              <span className="reviewspan">
                ✍️ <span style={{ color: "grey" }}>{pro.review}</span>
              </span>
            </div>
            <div>
              <StarRatingComponent
                edit={false}
                size={28}
                isHalf={true}
                Count={5}
                activeColor="purple"
                value={pro.rating}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
              />
            </div>
            <div>{pro.posted_at}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
