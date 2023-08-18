import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Product from "../Products/Product/Product";
import Signup from "../signup/signup";
import { useEffect, useState, useContext } from "react";
import Loader from "../../assets/loadder.gif";

const Home = () => {
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
    var loading=localStorage.getItem("loader");
    setLoader(loading);
  },[])

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
        <div className="home">
          <Banner />
          <div className="main-content">
            <div className="layout">
              <Category />
              <Product />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
