const express = require('express');
const router = express.Router();
const {User} = require('../Models/userModel');
const {Product} = require('../Models/productModel');
const {ObjectId} = require('mongodb');
const {getProducts,getProductById, deleteProduct, updateProduct, createProduct, reviewProduct} = require('../controllers/productController');
const {authorizeUser, isAdmin} = require('../middleware/authMiddleware');
  
router.route('/').get(getProducts).post(authorizeUser,isAdmin,createProduct)
router.route('/:id').get(getProductById).delete(authorizeUser,isAdmin,deleteProduct).put(authorizeUser,isAdmin,updateProduct)
router.route('/:id/reviews').post(authorizeUser,reviewProduct)


module.exports = router;