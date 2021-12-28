const express = require('express');
const {authorizeUser, isAdmin} = require('../middleware/authMiddleware')
const {addOrderItems, getOrderById, updateOrderToPaid, myOrders, allOrders, markAsDelivered} = require('../controllers/orderController')
const router = express.Router();

router.route('/').post(authorizeUser,addOrderItems).get(authorizeUser,isAdmin,allOrders)
router.route('/myorders').get(authorizeUser,myOrders)
router.route('/:id').get(authorizeUser,getOrderById)
router.route('/:id/pay').put(authorizeUser,updateOrderToPaid)
router.route('/:id/deliver').put(authorizeUser,isAdmin,markAsDelivered)


module.exports = router;
    