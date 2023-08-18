import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Loader from "../../assets/loadder.gif";

const Changepassword = () => {
  const navigate = useNavigate();
  const [current_pass, setCurrent_pass] = useState("");
  const [new_pass, setNewpass] = useState("");
  const [errors, setErrors] = useState(false);
  const [loader, setLoader] = useState(false);

  const formsubmit = async (e) => {
    e.preventDefault();
    if (current_pass.length == 0 || new_pass.length == 0) {
      setErrors(true);
      NotificationManager.error("Please Feel Required Fields");
    setLoader(false);
    } 
    else {
     setLoader(true);
      const formData = new FormData();
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("old_password", current_pass);
      formData.append("new_password", new_pass);

      const res = await axios.post(
        "http://localhost:3005/changepassword",
        formData
      );
      // console.log(res);
      if (res.data.success === "yes") {
        NotificationManager.success("PassWord updated successfully");
        setTimeout(function () {
        setLoader(false);
          navigate("/userprofile");
        }, 1000);
      }
      else if(res.data.success === "no"){
        setLoader(false);
      }
    }
  };

  return (
    <div>
      {loader ? (
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
      ) : (
        <>
          <h2 className="formheading">Change Password</h2>
          <Form.Control
            className="space"
            size="lg"
            type="text"
            placeholder="Enter Your Current Password."
            onChange={(e) => setCurrent_pass(e.target.value)}
          />
          {errors && current_pass.length <= 0 ? (
            <label className="validlable">Enter Your Current password *</label>
          ) : (
            ""
          )}
          <Form.Control
            className="space"
            size="lg"
            type="text"
            placeholder="Enter New Password."
            onChange={(e) => setNewpass(e.target.value)}
          />
          {errors && new_pass.length <= 0 ? (
            <label className="validlable">Enter New password *</label>
          ) : (
            ""
          )}
          <Button
            variant="primary"
            size="lg"
            style={{ marginBottom: "20px" }}
            onClick={(e) => formsubmit(e)}
          >
            Submit
          </Button>
          <NotificationContainer />
        </>
      )}
    </div>
  );
};

export default Changepassword;
