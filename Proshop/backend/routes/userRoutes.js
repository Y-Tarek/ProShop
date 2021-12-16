const express = require('express');
const router = express.Router();
const {authUser,getAllUsers, getUserprofile, registerUser} = require('../controllers/userController');
const { authorizeUser } = require('../middleware/authMiddleware');

router.post('/login',authUser);
router.post('/register',registerUser);
router.route('/profile').get(authorizeUser,getUserprofile);
router.get('/all',getAllUsers);

module.exports = router;
