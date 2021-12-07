const Mongoose = require('mongoose');
const {dotenv} = require('dotenv').config();
const {users} = require('./data/user');
const {products} = require('./data/products');
const {User} = require('./Models/userModel');
const {Product} = require('./Models/productModel');
const {Order} = require('./Models/orderModel');
const {mongoose} = require('./config/db');

const imortData = async () => {
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(p => {
        // ... returning all staff in each product and in addition we add the adminuser into each product
        return {...p, user:adminUser}
    })
    await Product.insertMany(sampleProducts);
    console.log('data Imported');
  }catch(e){
    console.log(e);
  }
}

const destroyData = async () => {
    try{
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
      
      console.log('data destroyed');
    }catch(e){
      console.log(e);
    }
  }

  if(process.argv[2]  === '-d'){
      destroyData();
  }else{
    imortData();
  }