const express = require('express');
const {Order} = require('../Models/orderModel');
const {ObjectId} = require('mongodb');

const addOrderItems = ( async (req,res) => {
  var id = req.user._id;
  var {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length === 0){
      res.status(404).send()
  }else{
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user:id
      });
      const createdOrder = await order.save();
      res.status(201).send(createdOrder);
  }

})

const getOrderById = ((async (req,res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(400).send('id not valid')
  }
  var order = await Order.findById(id).populate('user', 'name email');
  if(!order){
    res.status(404).send();
  }
  res.status(200).send(order);  
}))


const updateOrderToPaid = (async (req,res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(400).send('id not valid')
  }
  var order = await Order.findById(id);
  if(!order){
    res.status(404).send();
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address
  }
  const updatedOrder = await order.save();
  res.status(200).send(updatedOrder);
})

const myOrders = (async (req,res) => {
  var orders = await Order.find({user: req.user._id});
  if(!orders){
    res.status(404).send();
  } 
  res.status(200).send(orders)
  
})

const allOrders = (async (req,res) => {
  const orders = await Order.find({}).populate('user', 'id name');
   if(!orders){
     res.status(404).send()
   }
   res.status(200).send(orders)
})

const markAsDelivered = (async (req,res) => {
  const deliveredOrder = await Order.findOneAndUpdate({_id:req.params.id},
     {$set:{isDelivered:true, deliveredAt:Date.now()}},
      {new:true}
      );
 if(!deliveredOrder){
   res.status(400).send()
 }
 res.status(200).send('Delivered')
})

 
module.exports = {addOrderItems, getOrderById, updateOrderToPaid, myOrders, allOrders, markAsDelivered}
    