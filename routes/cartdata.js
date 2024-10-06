const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router  = express.Router();
const CartDetails = require('../modals/CartDetails')


// Route: 1 For put the products in cart 
router.post('/putToCart', fetchUser , async(req,res)=>{
    try{
    const {title, price, original_price, star_rating, num_rating, photo}  = req.body

   const product = await CartDetails.create({title, price, original_price, star_rating, num_rating, photo, user:req.user.id});
   res.status(400).json({msg:"Successfully Added the product", success:'true'})
}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})
}
})

// Route: 2 For get the products from cart 
router.get('/getFromCart', fetchUser , async(req,res)=>{
    try{
   const user = await CartDetails.find({user:req.user.id})
    res.status(400).json({user, success:'true'})
}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})
}
})

// Route: 3 For Remove the product from cart 
router.delete('/remove/:id', fetchUser , async(req,res)=>{
    try{
   const product = await CartDetails.findByIdAndDelete(req.params.id);
   res.status(400).json({msg:"Successfully Deleted the product", success:'true'})
}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})

}
})

module.exports = router;