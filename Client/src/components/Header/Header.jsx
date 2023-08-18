import { useEffect, useState, useContext } from "react";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { Search } from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";
import "./Header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../assets/loadder.gif";
import { BsCart3 } from "react-icons";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const user_name = localStorage.getItem("first_name");
const last_name = localStorage.getItem("last_name");
const isLogin = localStorage.getItem("isLoggedIn")
  ? localStorage.getItem("isLoggedIn")
  : "false";
const id = localStorage.getItem("user_id");

const Header = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [cartitem, setCartitem] = useState({product_count:"0"});

  const userlogin = () => {
    navigate("/login");
  };

  const handleSubmit = () => {};
  const userprofile = () => {
    navigate("/userprofile");
  };
  const updateProfile = () => {
    navigate("/updateprofile");
  };
  const logout = () => {
    setLoader(true);
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("country_id");
    localStorage.removeItem("state_id");
    localStorage.removeItem("city_id");
    NotificationManager.success("logout successfully");
    setTimeout(function () {
      navigate("/login");
      window.location.reload();
      setLoader(false);
    }, 1500);
    // window.location.reload()
  };
  const changepassword = () => {
    navigate("/changepassword");
  };
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const cartlisiting =async()=>{
      // window.location.reload();
    var uid = localStorage.getItem("user_id");

    var data = {
      user_id: uid,
    };

    const res = await axios.post(
      "http://localhost:3005/product/cart_listing",
      data
    );

    if (res?.data?.success === "yes") {
      setCartitem(res?.data?.data)
      // console.log("cart",res)
    }
  }
  useEffect(() => {
    cartlisiting();
  }, [cartitem.product_count]);

  return (
    <section className="nav-bg navstrip">
      <nav className="navbar navbar-expand-lg navstrip">
        <div className="container">
          <a className="navbar-brand" href="/">
            <h1>BOAT STORE</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown me-2" id="menu">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Your Profile
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <div className="row p-3">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <h5 className="welcome">
                          Welcome,{" "}
                          {!user_name ? <></> : user_name + " " + last_name}
                        </h5>
                      </div>
                      {isLogin == "false" ? (
                        <>
                          <p style={{ marginTop: "15px" }}>
                            To access account and manage orders
                          </p>
                          <div className="col-12 col-sm-12 col-md-3 col-lg-5">
                            <button
                              className="btn login-btn"
                              onClick={() => {
                                window.location.href = "/signup";
                              }}
                              type="btn"
                            >
                              Sign up
                            </button>
                          </div>
                          <div className="col-12 col-sm-12 col-md-3 col-lg-5 mt-2 mt-sm-3 mt-md-0 mt-lg-0">
                            <button
                              className="btn login-btn"
                              onClick={() => {
                                window.location.href = "/login";
                              }}
                              type="btn"
                            >
                              Log In
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </li>
                  {isLogin == "true" ? (
                    <>
                      <li className="text-center dropdown-divider-width">
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => userprofile()}
                        >
                          MY PROFILE
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => updateProfile()}
                        >
                          UPDATE PROFILE
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => changepassword()}
                        >
                          CHANGE PASSWORD
                        </a>
                      </li>
                      <li className="text-center dropdown-divider-width">
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={() => logout()}>
                          LOGOUT
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </li>
            </ul>

            <form
              className="d-flex me-3"
              name="search_form"
              method="post"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                autoComplete="off"
                className="form-control me-2"
                type="search"
                id="search_text"
                placeholder="Search Your Product"
                aria-label="Search"
                name="search_text"
              />
              <button className="btn search-btn" type="submit">
                Search
              </button>
            </form>
            {isLogin == "true" ? (
              <>
                <div className="right">
                  <AiOutlineHeart style={{fontSize:"35px"}} onClick={()=>{window.location.href="/wishlist"}}/>
                  <span className="cart-icon" onClick={()=>{window.location.href="/cart"}}>
                    <CgShoppingCart style={{fontSize:"35px",marginLeft:"10px"}} />
                    <div style={{position:"relative",left:"65px",bottom:"42px",backgroundColor:"black",width:"18px",height:"22px",color:"white",borderRadius:"50%",textAlign:"center"}} >{cartitem.product_count}</div>
                  </span>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <NotificationContainer />
      </nav>
    </section>
    // <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
    //   <div className="header-content">
    //     <div className="left">BOAT STORE</div>
    //     <div className="center">
    //       <ul className="navbarboth">
    //         <li>home</li>
    //         <li>
    //           <a
    //             className="nav-link dropdown-toggle"
    //             href="#"
    //             id="navbarDropdown"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Your Profile
    //           </a>
    //           <ul className="uldropdown" >
    //             <li>
    //                 <div className="row" >
    //                 <div>
    //                                     <h5>Welcome, {!user_name ? <></> : user_name +" "+ last_name}</h5>
    //                                     <p>To access account and manage orders</p>
    //                                 </div>
    //                 </div>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //
    //   </div>
    // </header>
  );
};

export default Header;
