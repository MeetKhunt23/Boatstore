import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./signup.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import $ from "jquery";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Messages from "../constants/messages.js";
import Loader from "../../assets/loadder.gif";

const Signup = () => {
  const navigate = useNavigate();
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  console.log(gender);
  const [country_id, setCountry_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [city_id, setCity_id] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [pfile, setPfile] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState(true);
  const [field, setFields] = useState({});
  const [loader, setLoader] = useState(false);

  var PASSWORD_PATTERN = /(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z].{6,}/;
  var EMAIL_PATTERN =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var NUMBER_PATTERN =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  var sha512 = require("js-sha512");

  const hidemsg = (hide) => {
    $("#" + hide).html("");
  };

  const HandleValidation_Register = () => {
    if ($("#f_name").val() === "") {
      $("#first_name_error").html(Messages.first_name_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#first_name_error").html("");
    }

    if ($("#l_name").val() === "") {
      $("#last_name_error").html(Messages.last_name_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#last_name_error").html("");
    }

    if ($("#number").val() === "") {
      $("#number_error").html(Messages.number_msg);
      setErrors(true);
    } else if (!NUMBER_PATTERN.test($("#number").val())) {
      setErrors(true);
      $("#number_error").html(Messages.valid_number_msg);
    } else {
      setErrors(false);
      $("#number_error").html("");
    }

    if ($("#email").val() === "") {
      setErrors(true);
      $("#email_error").html(Messages.email_msg);
    } else if (!EMAIL_PATTERN.test($("#email").val())) {
      setErrors(true);
      $("#email_error").html(Messages.email_valid_msg);
    } else {
      setErrors(false);
      $("#email_error").html("");
    }

    if ($("#password").val() === "") {
      setErrors(true);
      $("#password_error").html(Messages.pass_msg);
    } else if ($("#password").val().match(PASSWORD_PATTERN) === null) {
      setErrors(true);
      $("#password_error").html(Messages.pass_valid_msg);
    } else {
      setErrors(false);
      $("#password_error").html("");
    }

    if ($("#confirm_password").val() === "") {
      setErrors(true);
      $("#confirm_password_error").html(Messages.confirm_pass_msg);
    } else if ($("#password").val() !== $("#confirm_password").val()) {
      setErrors(true);
      $("#confirm_password_error").html(Messages.pass_not_match);
    } else {
      setErrors(false);
      $("#confirm_password_error").html("");
    }

    if (!gender) {
      setErrors(true);
      $("#gender_error").html(Messages.gender_msg);
    } else {
      setErrors(false);
      $("#gender_error").html("");
    }

    if (pfile === "") {
      setErrors(true);
      $("#profile_pic_error").html(Messages.profile_img_blank_msg);
    } else {
      setErrors(false);
      $("#profile_pic_error").html("");
    }

    if (!localStorage.getItem("country_id")) {
      setErrors(true);
      $("#country_error").html(Messages.country_msg);
    } else {
      setErrors(false);
      $("#country_error").html("");
    }

    if (!localStorage.getItem("state_id")) {
      setErrors(true);
      $("#state_error").html(Messages.state_msg);
    } else {
      setErrors(false);
      $("#state_error").html("");
    }

    if (!localStorage.getItem("city_id")) {
      setErrors(true);
      $("#city_error").html(Messages.city_msg);
    } else {
      setErrors(false);
      $("#city_error").html("");
    }
  };

  const formsubmit = async (e) => {
    debugger;
    e.preventDefault();
    console.log(country_id);
    console.log(state_id);
    console.log(city_id);
    HandleValidation_Register();
    // checkValidation();
    if (errors == false) {
      const formData = new FormData();
      formData.append("first_name", f_name);
      formData.append("last_name", l_name);
      formData.append("mobile", number);
      formData.append("email", email);
      formData.append("password", Password);
      formData.append("profile_picture", pfile);
      formData.append("gender", gender);
      formData.append("country_id", localStorage.getItem("country_id"));
      formData.append("state_id", localStorage.getItem("state_id"));
      formData.append("city_id", localStorage.getItem("city_id"));
      setLoader(true);

      const res = await axios.post("http://localhost:3005/signup", formData);
      console.log(res);
      console.log(res.data.success);
      console.log(res.data.message);
      if (res.data.success === "yes") {
        localStorage.setItem("user_id", res?.data?.data.user_id);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("first_name", res.data.data.first_name);
        localStorage.setItem("last_name", res.data.data.last_name);
        NotificationManager.success("You are Signed in successfully");
        setTimeout(() => {
          setLoader(false);
          navigate("/");
          window.location.reload();
        }, 1200);
      } else if (res.data.message === "Mobile number already exists") {
        $("#number_error").html(Messages.mobile_exist_already);
        setLoader(false);
        NotificationManager.error("Mobile Number Allready Exists");
      } else if (res.data.message === "Email already exists") {
        $("#email_error").html(Messages.email_exist_already);
        setLoader(false);
        NotificationManager.error("Email Id Allready Exists");
      } else {
        setLoader(false);
        NotificationManager.error("Enter All Details Required.");
      }
    }
  };

  const getcountries = async () => {
    const res = await axios.get("http://localhost:3005/address/country");
    console.log(res);
    if (res?.data?.success === "yes") {
      setCountries(res?.data?.data);
    }
  };

  useEffect(() => {
    getcountries();
  }, []);

  const getstates = async () => {
    var country_idd = localStorage.getItem("country_id");
    setCountry_id(localStorage.getItem("country_id"));
    // setCountry_id(country_idd);
    if (country_idd != "") {
      var id = {
        country_id: country_idd,
      };
    } else {
      var id = {
        country_id: "",
      };
    }

    const stateres = await axios.post(
      "http://localhost:3005/address/states",
      id
    );

    if (stateres?.data?.success === "yes") {
      setStates(stateres?.data?.data);
    }
  };

  const getcities = async () => {
    const state_idd = localStorage.getItem("state_id");
    if (state_idd != "") {
      var sid = {
        state_id: state_idd,
      };
    } else {
      var sid = {
        state_id: "",
      };
    }

    const cityres = await axios.post("http://localhost:3005/address/city", sid);

    if (cityres?.data?.success === "yes") {
      setCitylist(cityres?.data?.data);
    }
  };

  return (
    <>
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
        <div className="maindiv">
          <h2 className="formheading">Sign Up Here</h2>
          <span
            style={{
              width: "70%",
              fontSize: "16px",
              marginLeft: "15%",
              marginBottom: "15px",
            }}
          >
            <Form.Control
              size="lg"
              name="f_name"
              type="text"
              id="f_name"
              onKeyDown={() => {
                hidemsg("first_name_error");
              }}
              onChange={(e) => setF_name(e.target.value)}
              className="input-field"
              placeholder="Enter First Name"
            />
            <span id="first_name_error" className="text-danger"></span>
          </span>
          <span
            style={{
              width: "70%",
              fontSize: "16px",
              marginLeft: "15%",
              marginBottom: "15px",
            }}
          >
            <Form.Control
              size="lg"
              name="l_name"
              type="text"
              id="l_name"
              onKeyDown={() => {
                hidemsg("last_name_error");
              }}
              onChange={(e) => setL_name(e.target.value)}
              className="input-field"
              placeholder="Enter last Name"
            />
            <span id="last_name_error" className="text-danger"></span>
          </span>

          <span
            style={{ width: "70%", marginLeft: "15%", marginBottom: "15px" }}
          >
            <Form.Control
              className="input-field"
              size="lg"
              type="number"
              id="number"
              placeholder="Enter Mobile Number"
              onKeyDown={() => {
                hidemsg("number_error");
              }}
              onChange={(e) => setNumber(e.target.value)}
              maxLength="10"
              name="number"
              required
            />
            <span id="number_error" className="text-danger"></span>
          </span>
          <span
            style={{ width: "70%", marginLeft: "15%", marginBottom: "15px" }}
          >
            <Form.Control
              className="input-field"
              size="lg"
              type="text"
              id="email"
              placeholder="Enter Email Address"
              onKeyDown={() => {
                hidemsg("email_error");
              }}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
            <span id="email_error" className="text-danger"></span>
          </span>
          <span
            style={{ width: "70%", marginLeft: "15%", marginBottom: "15px" }}
          >
            <Form.Control
              className="input-field"
              size="lg"
              type="text"
              id="password"
              placeholder="Enter Password"
              onKeyDown={() => {
                hidemsg("password_error");
              }}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <span id="password_error" className="text-danger"></span>
          </span>

          <span
            style={{ width: "70%", marginLeft: "15%", marginBottom: "15px" }}
          >
            <Form.Control
              className="input-field"
              size="lg"
              type="text"
              id="confirm_password"
              placeholder="Enter Confirm Password"
              onKeyDown={() => {
                hidemsg("confirm_password_error");
              }}
              name="confirm_password"
            />
            <span id="confirm_password_error" className="text-danger"></span>
          </span>
          <div className="space radiobutton">
            <span>Select Gender : ➡️</span>
            <input
              type="radio"
              value="1"
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              onClick={() => {
                hidemsg("gender_error");
              }}
            />{" "}
            Male
            <input
              type="radio"
              value="0"
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              onClick={() => {
                hidemsg("gender_error");
              }}
            />
            Female
            <span
              id="gender_error"
              className="text-danger"
              style={{ marginLeft: "280px" }}
            ></span>
          </div>
          <div className="space radiobutton">
            <br />
            <span>Insert profile picture ➡️</span>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={(e) => setPfile(e.target.files[0])}
              onClick={() => {
                hidemsg("profile_pic_error");
              }}
            />
            <span id="profile_pic_error" className="text-danger"></span>
          </div>
          <br />
          <div style={{ marginBottom: "10px", position: "relative" }}>
            <Form.Select
              className="space"
              id="country"
              aria-label="Default select example"
              onChange={(e) =>
                localStorage.setItem("country_id", e.target.value)
              }
              onClick={() => {
                hidemsg("country_error");
              }}
            >
              <option>Select Country</option>
              {countries.map((row, index) => (
                <option value={row.id} key={index}>
                  {row.name}
                </option>
              ))}
            </Form.Select>
            <span id="country_error" className="text-danger c_id"></span>
          </div>
          <div style={{ marginBottom: "10px", position: "relative" }}>
            <Form.Select
              className="space"
              aria-label="Default select example"
              id="state"
              onClick={() => getstates()}
              onChange={(e) => localStorage.setItem("state_id", e.target.value)}
              onMouseDown={() => {
                hidemsg("state_error");
              }}
            >
              <option>Select State</option>
              {states.map((row, index) => (
                <option value={row.id} key={index}>
                  {row.name}
                </option>
              ))}
            </Form.Select>
            <span id="state_error" className="text-danger c_id"></span>
          </div>
          <div style={{ marginBottom: "10px", position: "relative" }}>
            <Form.Select
              className="space"
              id="city"
              aria-label="Default select example"
              onClick={() => getcities()}
              onChange={(e) => localStorage.setItem("city_id", e.target.value)}
              onMouseDown={() => {
                hidemsg("city_error");
              }}
            >
              <option>Select City</option>
              {citylist.map((row, index) => (
                <option value={row.id} key={index}>
                  {row.name}
                </option>
              ))}
            </Form.Select>
            <span id="city_error" className="text-danger c_id"></span>
          </div>

          <Button variant="primary" size="lg" onClick={(e) => formsubmit(e)}>
            Submit
          </Button>
          <br />
          <NotificationContainer />
        </div>
      )}
    </>
  );
};

export default Signup;
