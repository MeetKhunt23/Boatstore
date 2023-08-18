import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
// import '../signup/signup.css'
import './userprofile.css'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Updateprofile = () => {
  const navigate = useNavigate();
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [pfile, setPfile] = useState("");
  const [user_data, setUser_data] = useState([]);
  


const userr_data=async()=>{
const user_id=localStorage.getItem("user_id");
const obj={
  user_id:user_id
}
const res = await axios.post("http://localhost:3005/user_info",obj);
console.log(res);
setUser_data(res.data.data);
  }

  useEffect(()=>{
    userr_data();
  },[])

  const formsubmit = async (e) => {
    e.preventDefault();
    if (
      f_name.length == 0 ||
      l_name.length == 0 ||
      number.length == 0 ||
      email.length == 0
    ) {
      setErrors(true);
      NotificationManager.error("Please Feel Required Fields");
    }
    else{
        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("first_name", f_name);
        formData.append("last_name", l_name);
        formData.append("mobile", number);
        formData.append("email", email);
        formData.append("profile_picture", pfile);


        const res = await axios.post("http://localhost:3005/updateprofile", formData);
      // console.log(res);
      if (res.data.success === "yes") {
        NotificationManager.success("updated successfully");
        setTimeout(function (){
         navigate("/userprofile");
        // window.location.reload()
        },1500)
      }
      else if(res.data.message=="email allready exists.")
      NotificationManager.error("Email Id is Already Exists");
    }
  };

  return (
    <div className="main-div">
      <h2 className="formheading">Profile Update</h2>
      <Form.Control
        className="space"
        size="lg"
        type="text"
        placeholder={user_data.first_name}
        onChange={(e) => setF_name(e.target.value)}
      />
       {errors && f_name.length <= 0 ? (
        <label className="validlable">First Name is Required *</label>
      ) : (
        ""
      )}
      <Form.Control
        className="space"
        size="lg"
        type="text"
        placeholder={user_data.last_name}
        onChange={(e) => setL_name(e.target.value)}
      />
       {errors && l_name.length <= 0 ? (
        <label className="validlable">Last Name is Required *</label>
      ) : (
        ""
      )}
      <Form.Control
        className="space"
        size="lg"
        type="text"
        placeholder={user_data.email}
        onChange={(e) => setEmail(e.target.value)}
      />
       {errors && email.length <= 0 ? (
        <label className="validlable">Email Address  is Required *</label>
      ) : (
        ""
      )}
      <Form.Control
        className="space"
        size="lg"
        type="text"
        placeholder={user_data.mobile}
        onChange={(e) => setNumber(e.target.value)}
      />
       {errors && number.length <= 0 ? (
        <label className="validlable">Mobile Number is Required *</label>
      ) : (
        ""
      )}
      <br/>
      <div className="validlablepp">
      <span>Insert profile picture :   </span>
      <input type="file" onChange={(e) => setPfile(e.target.files[0])} />
      <br/>
      {errors && pfile.length <= 0 ? (
        <label className="validlablepp"> Insert your profile picture*</label>
      ) : (
        ""
      )}
      </div>
      <Button variant="primary" size="lg" onClick={(e) => formsubmit(e)}>
        Submit
      </Button>
      <NotificationContainer/>
    </div>
  );
};

export default Updateprofile;
