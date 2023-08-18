import React, { useEffect, useState } from "react";
import Product from "../Products/Product/Product";
import axios from "axios";
import "./wishlist.css";
import $, { data } from "jquery";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { AiOutlineClose } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";


const Wishlist = () => {
  const [productdetail, setProductdetail] = useState([]);

  const Getwishlist = async () => {
    var uid = localStorage.getItem("user_id");
    var data = {
      user_id: uid,
    };
    const res = await axios.post("http://localhost:3005/getwishlist", data);
    console.log(res);
    if (res?.data?.success === "yes") {
      setProductdetail(res?.data?.data);
    }
  };

  const removefromwish=async(product_id)=>{
    var uid = localStorage.getItem("user_id");
  var data = {
    user_id: uid,
    product_id: product_id
  };
  const res = await axios.post(
    "http://localhost:3005/add_or_remove_wishlist",
    data
  );

  if (res?.data?.success === "yes") {
    NotificationManager.success("product removed from wishlist successfully.")
    Getwishlist();
//     setTimeout(() => {
// window.location.reload();
//     }, 1000);
  }
  }


  const addcart =async(product_id)=>{
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

  useEffect(() => {
    Getwishlist();
  }, []);

  return (
    <>
    {(!productdetail.length) ? <div style={{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",color:"grey"}} id="emptyw">Wishlist Is Empty.</div>
    : 
       <div>
       {productdetail.map((pro, index) => (
         <div key={index} className="cont" style={{position:"relative"}} >
           <div className="left">
             <img src={pro.image} className="wishimg" onClick={()=>{window.location.href="/getproductdetails/"+ pro.product_id}}/>
           </div>
           <div className="right">
             <h2>{pro.product_name}</h2>
             <h5>Description:{pro.description}</h5>
             <h5>
               Price :{" "}
               <span style={{ color: "red", textDecoration: "line-through" }}>
                 {pro.price}&#8377;{" "}
               </span>
             </h5>
             <h5>
               Disc. price :
               <span style={{ color: "green" }}>{pro.selling_price}&#8377;</span>{" "}
             </h5>
             <h5>Expected delivery time : {pro.expected_delivery_time}</h5>
           </div>
           <div className="removewish">
             <AiOutlineClose style={{fontSize:"20px",position:"absolute",right:"15px"}} onClick={()=>removefromwish(pro.product_id)}/>
           </div>
           <div>
           </div>
           <CgShoppingCart className="addcart" onClick={()=>addcart(pro.product_id)}/>
         </div>
       ))}
     </div>
}
<NotificationContainer/>
    </>
   
  );
};

export default Wishlist;
