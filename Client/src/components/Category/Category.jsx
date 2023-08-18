import "./Category.scss";
import Product from "../Products/Products.jsx";

const Category = () => {
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">Category Title</div>  
        <Product innerpage={true} /> 
      </div>
    </div> 
  );
};

export default Category;
