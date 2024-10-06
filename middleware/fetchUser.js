const jwt = require('jsonwebtoken')
const secret_Key = 'ArpanSinghJi'
const fetchUser = (req, res, next)=>{

    // For getting the id from the auth-tokeen 
    const token = req.header('auth-token')
    if(!token){
        res.status(401).json({msg:'Invalid Autorization', success:'false'})
    }
    try{
    const decoded = jwt.verify(token, secret_Key);
    req.user = decoded.user
    next();
    }
    catch{
        res.status(401).json({msg:'Invalid Autorization', success:'false'})
    }
}
module.exports = fetchUser