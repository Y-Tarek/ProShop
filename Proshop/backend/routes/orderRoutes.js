const express = require('express');
const {authorizeUser} = require('../middleware/authMiddleware')
const {addOrderItems} = require('../controllers/orderController')
const router = express.Router();

router.post('/',authorizeUser,addOrderItems)

module.exports = router;
