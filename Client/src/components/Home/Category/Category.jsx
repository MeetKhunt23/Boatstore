import "./Category.scss";
import cat1 from "../../../assets/category/cat-1.jpg"
import axios from "axios";
import React,{ useEffect } from "react";
import { useState } from "react";

const Category = () => {
const [category,setCategory] = useState([])
    const newcatimage = async() =>{
const res = await axios.get('http://localhost:3005/category/allCategory')
console.log(res); 
if(res?.data?.success === 'yes'){
   setCategory(res?.data?.data)
}
    
    }
    useEffect(()=>{
        newcatimage();
    },[])

    return <div className="shop-by-category">
        <div className="categories">
            {
                category.map((row,index)=>
            <div className="category" key={index}>
                <img src={row.image} alt="" />
                {/* <span className="naem">{row.name}</span> */}
            </div>
            )}
        </div>
    </div>;
};

export default Category;
