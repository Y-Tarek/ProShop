const {Product} = require('../Models/productModel');
const {ObjectId} = require('mongodb');
const { products } = require('../data/products');



var getProducts = ((req,res) => {
    Product.find({}).then((data) => {
        if(!data){
            res.status(404).send();
        }
        res.status(200).send(data);
    }).catch((e) => {res.status(400).send(e)})
}) 


var getProductById = ((req,res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.send('ID NOT VALID')
    }
   Product.findOne({_id: id}).then((p) => {
      if(!p){
          res.status(404).send();
      }
      res.status(200).send(p);
   }).catch((e) => {res.status(400).send(e)});
});

var createProduct = (async (req,res) => {
    const product = new Product({
        user:req.user._id,
        name: 'Sample Product',
        image: '/images/sample.jpg', 
        brand: 'Sample brand',
        category: 'Sample Category',
        descreption: 'Sample descreption',
        numReviews:0,
        price: 0,
        countInStock:0
    });
    const createdProduct = await product.save();
     if(!createdProduct){
          res.status(400).send('something not right')
     }
    res.status(201).send(createdProduct);
})

var updateProduct = (async (req,res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.send('ID NOT VALID')
    }
  
    const updatedProduct = await Product.findOneAndUpdate({_id:id}, {$set:req.body}, {new:true});
    if(!updatedProduct){
         res.status(404).send()
    }
    res.status(200).send({
        _id: updatedProduct._id,
        name:updatedProduct.name,
        price: updatedProduct.price,
        category: updatedProduct.category,
        brand:updatedProduct.brand,
        image:updatedProduct.image
    });
})


var deleteProduct = (async (req,res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.send('ID NOT VALID')
    }
    var product = await Product.findById(id);
     if(!product){
         res.status(404).send()
     }
     await product.remove();
     res.status(200).send('Deleted Successfuly')
})

var reviewProduct = (async (req,res) => {
    const {rating, comment} = req.body;
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.send('ID NOT VALID')
    }
    const product = await Product.findById({_id:id});
    if(!product){
         res.status(404).send()
    }
    const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString());
     if(alreadyReviewd){
         res.status(400).send('already Reviewed')
     }else{
         const review = {
             name:req.user.name,
             rating: Number(rating),
             comment,
             user: req.user._id
         }
         product.reviews.push(review);
         product.numReviews = product.reviews.length;
         product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0 / product.reviews.length);
         await product.save();
         res.status(201).send('Review added')
     }
    
})

module.exports = {getProducts, getProductById, updateProduct, deleteProduct, createProduct, reviewProduct};