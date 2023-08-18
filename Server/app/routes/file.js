const express=require('express');
const path=require('path');
const router=express.Router();

router.get("/category/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../uploads/category_image/"+req.params.filename))
})
router.get("/product/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../uploads/product_image/"+req.params.filename))
})
router.get("/profile_image/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../uploads/profile_image/"+req.params.filename))
})

module.exports=router;