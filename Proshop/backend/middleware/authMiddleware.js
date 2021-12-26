const {User} = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { rearg } = require('lodash');

const authorizeUser = async function(req,res,next){
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){
        res.status(401).send()
    }
  var token = req.headers.authorization.split(' ')[1];
   if(!token){
       return res.status(401).send();
   }

  try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET); 
      var user = await User.findById(decoded._id).select('-password');
      req.user = user;

      next(); 

  } catch (error) {
      res.status(400).send(error)
  }

}

const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(402).send("No Access to this Route");
    }
}

module.exports= {authorizeUser, isAdmin};