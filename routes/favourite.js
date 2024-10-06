const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router  = express.Router();
const Favourites = require('../modals/Favourites')


// Route: 1 For put the personal details
router.post('/putToFavourite', fetchUser , async(req,res)=>{
    try{
    const {title, price, original_price, star_rating, num_rating, photo}  = req.body

   const product = Favourites.create({title, price, original_price, star_rating, num_rating, photo, user:req.user.id});
   res.status(400).json({msg:"Successfully Added the product", success:'true'})

}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})

}
})

// Route: 2 For get the personal details
router.get('/getFromFavourite', fetchUser , async(req,res)=>{
    try{
   const user = await Favourites.find({user:req.user.id})
    res.send({user, success:'true'})
}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})
}
})

// Route: 3 For Remove the product from cart 
router.delete('/remove/:id', fetchUser , async(req,res)=>{
    try{
   const product = await Favourites.findByIdAndDelete(req.params.id);
   res.status(400).json({msg:"Successfully Deleted the product", success:'true'})
}
catch{
    res.status(400).json({msg: "Internal server error", success:'false'})
}
})

module.exports = router;