const {User} = require('../Models/userModel');
const {userResource} = require('../resources/userResource');
const {ObjectId} = require('mongodb');


var registerUser = ( async (req,res) => {
  const {name,email,password} = req.body;
  const userExsists = await User.findOne({email});
   if(userExsists){
       return res.send('Email already registered');
   }
   var user =  await User.create({
       name:name,
       email:email,
       password:password
   });
    if(user){
        res.status(201).send({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:user.generateAuthToken()
        })
    }else{
        res.status(400).send();
    }
   
})

var authUser = (async (req,res) => {
 const {email, password} = req.body;
 const user = await User.findByEmail(email);
 if(user &&  await(user.matchPasssword(password))){
  res.status(200).send({
    _id: user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:user.generateAuthToken()
  });
 }else{
     res.status(401).send('Inavid username or password')
 }

});

var getUserprofile = ( async (req,res) => {
  var user = await User.findOne({_id:req.user._id});
   if(!user){
       return res.status(404).send();
   }
  return res.status(200).send({
    _id: user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
  });
})

var updateProfile = (async (req,res) => {
  var user = req.user;
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
   if(req.body.password){
    user.password = req.body.password
   }
   const updatedUser = await user.save();
   res.status(200).send({
    _id: updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
   });
  
})

var getAllUsers = ( async (req,res) => {
  var users = await User.find({});
   if(!users){
       res.status(404).send()
   }
  res.status(200).send(users);
  
})

var deleteUser = (async (req,res) => {
  var id = req.params.id;
  const user = await User.findById(id);
   if(!user){
     res.status(404).send();
   }
  await user.remove();
  res.status(200).send("User Removed")
})


var getUserById = (async (req,res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(400).send()
  }
  var user = await User.findById(id).select('-password');
   if(!user){
     res.status(404).send()
   }
   res.status(200).send(user);
})


var updateUser = (async (req,res) => {
  var user = await User.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new:true});
  if(!user){
    res.status(404).send();
  }
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email:user.email,
    isAdmin: user.isAdmin
  })

  
  
})


module.exports = {authUser, getAllUsers, getUserprofile, registerUser, updateProfile, deleteUser, getUserById, updateUser};