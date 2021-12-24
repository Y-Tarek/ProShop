const express = require('express');
const {authorizeUser} = require('../middleware/authMiddleware')
const {addOrderItems, getOrderById, updateOrderToPaid, myOrders} = require('../controllers/orderController')
const router = express.Router();

router.post('/',authorizeUser,addOrderItems)
router.route('/myorders').get(authorizeUser,myOrders)
router.route('/:id').get(authorizeUser,getOrderById)
router.route('/:id/pay').put(authorizeUser,updateOrderToPaid)


module.exports = router;
    