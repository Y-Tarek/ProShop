const {Product} = require('../Models/productModel');
const {ObjectId} = require('mongodb');



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

module.exports = {getProducts, getProductById};