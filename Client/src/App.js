import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Signup from "./components/signup/signup";
import Login from "./components/authentication/login";
import Userprofile from "./components/authentication/userprofile";
import Updateprofile from "./components/authentication/updateprofile";
import Changepassword from "./components/authentication/changepassword";
import Wishlist from "./components/wishlist/wishlist";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout"
import Reviews from "./components/Reviews/Reviews";


function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/getproductdetails/:id" element={<SingleProduct/>} />
          <Route path="/Category/:id" element={<Category />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/updateprofile" element={<Updateprofile />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={< Cart/>} />
          <Route path="/checkout" element={< Checkout/>} />
          <Route path="/getreviews/:id" element={< Reviews/>} />
        </Routes>
        <Newsletter />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
