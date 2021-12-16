const {User} = require('../Models/userModel');
var users = User();

const userResource = (users) => {
//   switch (typeof users){
//       case 'array': 
//        console.log(typeof users);
//       users.forEach(user => {
//                 return {
//                     _id: user._id,
//                     name:user.name,
//                     email:user.email,
//                     isAdmin:user.isAdmin
//                 }
//             })
//                break;

//         case 'object':
//             console.log(typeof users);
//             return {
//                         _id: users._id,
//                         name:users.name,
//                         email:users.email,
//                         isAdmin:users.isAdmin
//                     }
//                 break;
//         default:
//             '';
//   }

    // if(typeof users === 'array'){
    //     console.log(typeof users);
    //     users.forEach(user => {
    //         return {
    //             _id: users._id,
    //             name:users.name,
    //             email:users.email,
    //             isAdmin:users.isAdmin
    //         }
    //     });
    // }else if(typeof users === 'object'){
    //     return {
    //         _id: users._id,
    //         name:users.name,
    //         email:users.email,
    //         isAdmin:users.isAdmin
    //     }
    // }
    //  return Object.values(users);
   
}

module.exports = {userResource};