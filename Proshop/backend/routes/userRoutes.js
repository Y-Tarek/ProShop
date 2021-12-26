const express = require('express');
const router = express.Router();
const {authUser,getAllUsers, getUserprofile, registerUser, updateProfile, deleteUser, getUserById, updateUser} = require('../controllers/userController');
const { authorizeUser, isAdmin } = require('../middleware/authMiddleware');

router.post('/login',authUser);
router.post('/register',registerUser);
router.route('/profile').get(authorizeUser,getUserprofile).put(authorizeUser,updateProfile); 
router.get('/all',authorizeUser,isAdmin,getAllUsers);
router.route('/:id').delete(authorizeUser,isAdmin,deleteUser).get(authorizeUser,isAdmin,getUserById).put(authorizeUser,isAdmin,updateUser);

module.exports = router;
  