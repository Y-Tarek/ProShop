const express = require('express');
const router = express.Router();
const {User} = require('../Models/userModel');
const {Product} = require('../Models/productModel');
const {ObjectId} = require('mongodb');
const {getProducts,getProductById} = require('../controllers/productController');
  
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)


module.exports = router;