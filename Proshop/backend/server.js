const express = require('express');
const {products} = require('./data/products');
const {dotenv} = require('dotenv').config();
const mongoose = require('./config/db');
const {User} = require('./Models/userModel');
const {Product} = require('./Models/productModel');
const productRoutes = require('./routes/productRoutes');
const {errorHandler,notFound, erroHandler} = require('./middleware/errorMiddleware');
const app = express();

app.get('/',(req,res) => {
    res.send('API RUNNING');
})
app.use('/api/products',productRoutes);

app.use(notFound);

// Override the error handler middleware
app.use(erroHandler)

app.listen(process.env.PORT || 5000,(e) => {
    if(e){
        console.log(e);
    }
    console.log(`Server Running in ${process.env.NODE_ENV} On PORT ${process.env.PORT}`);
})