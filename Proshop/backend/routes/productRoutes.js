const express = require('express');
const router = express.Router();
const {User} = require('../Models/userModel');
const {Product} = require('../Models/productModel');
const {ObjectId} = require('mongodb');
  
router.get('/',(req,res) => {
    Product.find({}).then((data) => {
        if(!data){
            res.status(404).send();
        }
        res.status(200).send(data);
    }).catch((e) => {res.status(400).send(e)})
})

router.get('/:id',(req,res) => {
    var id = req.params.id;
      if(!ObjectId.isValid(id)){
          res.send('ID NOT VALID')
      }
     Product.find({_id: id}).then((p) => {
        if(!p){
            res.status(404).send();
        }
        res.status(200).send(p);
     }).catch((e) => {res.status(400).send(e)});
     
    
    
})


module.exports = router;