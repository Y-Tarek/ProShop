const express = require('express');
const {Order} = require('../Models/orderModel');

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

module.exports = {addOrderItems}
