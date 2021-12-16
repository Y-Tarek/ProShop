const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
 name: {
     type:String,
     required:true
 },
 email:{
     type:String,
     required:true,
     unique:true
 },
 password:{
    type:String,
    required:true,
},
isAdmin:{
    type:Boolean,
    required:true,
    default:false
},

},{
    timestamps:true
});


//Model Methods
UserSchema.statics.findByEmail = async function(email){
    var user = this;
    return await user.findOne({email});
    // return user.findOne({email}).then((data) => {
    //     if(!data){
    //         return new Promise.reject();
    //     }
    //     return data;
    // }).catch((e) => {console.log(e);})
}


//Instance Methods
UserSchema.methods.matchPasssword = async  function(pass){
    var user = this;
    return await bcrypt.compare(pass,user.password);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  return jwt.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn: '30d'
  });
}


UserSchema.pre('save',async function(next){
    var user = this;
    if(user.isModified('password')){
         var salt = await bcrypt.genSalt(10);
         user.password = await  bcrypt.hash(user.password,salt)
         next();
    }else{
        next();
    }
})

const User = mongoose.model('User',UserSchema);
module.exports = {User};