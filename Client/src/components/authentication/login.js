import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Loader from "../../assets/loadder.gif";

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [field, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [errorClassName, setErrorClassname] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    var user_id = localStorage.getItem("user_id");
    if (user_id) {
      navigate("/");
      window.location.reload();
    }
  }, []);
  const formsubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", Email);
    formData.append("password", Password);

    const res = await axios.post("http://localhost:3005/login", formData);
    // console.log(res);
    if (res.data.success === "yes") {
      console.log("login", res);
      localStorage.setItem("user_id", res.data.data.id);
      console.log("id", res.data.data.user_id);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("first_name", res.data.data.first_name);
      localStorage.setItem("last_name", res.data.data.last_name);
      localStorage.setItem("country_id", res.data.data.country_id);
      localStorage.setItem("state_id", res.data.data.state_id);
      localStorage.setItem("city_id", res.data.data.city_id);
      NotificationManager.success("login successfully");
      setTimeout(function () {
        setLoader(false);
        window.location.reload();
        navigate("/");
      }, 1000);
      // window.location.reload();
    } else {
      NotificationManager.error("Enter Correct Log in Details");
      console.log("heyy");
      setTimeout(function () {
        setLoader(false);
      }, 1000);
    }
  };

  const signup = async (e) => {
    navigate("/signup");
    window.location.reload();
  };

  return (
    <>
    {
 (loader)?
 <div
   style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
   }}
 >
   <img
     src={Loader}
     width="360px"
     alt=""
     height="350px"
     margin="40px 40px"
     className="mt-5 mb-5"
   />
 </div>
 :
 <div className="maindiv">
   <h2 className="formheading">Log In Here</h2>
   <Form.Control
     className="space"
     size="lg"
     type="text"
     placeholder="Enter Email Adress"
     onChange={(e) => setEmail(e.target.value)}
   />

   <Form.Control
     className="space"
     size="lg"
     type="text"
     placeholder="Enter Your Password"
     onChange={(e) => setPassword(e.target.value)}
   />
   <Button
     variant="primary"
     size="lg"
     onClick={(e) => formsubmit(e)}
     style={{ cursor: "pointer" }}
   >
     Submit
   </Button>
   <br />
   <h5
     onClick={() => {
       signup();
     }}
     style={{ color: "black", marginLeft: "41%" }}
   >
     Did not have an account?{" "}
     <b>
       {" "}
       <a style={{ color: "blue", cursor: "pointer" }}>Sign In </a>
     </b>
   </h5>
   <NotificationContainer />
 </div>
    }
     
    </>
  );
};

export default Login;
