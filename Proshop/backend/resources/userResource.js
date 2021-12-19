const {User} = require('../Models/userModel');
var users = User();
const _ = require('lodash');

const userResource =  (users) => {

    var data =  Object.values(users);
        if(Array.isArray(data[0])){
            var userData =  data[0].map(l => ({
                _id : l._id,
                name: l.name,
                email: l.email,
                isAdmin: l.isAdmin
            })); 
            return userData;
        }
        else{
            return  data.map(l => ({
                _id : l._id,
                name: l.name,
                email: l.email,
                isAdmin: l.isAdmin
            }));   
        }
    
   
}

module.exports = {userResource};