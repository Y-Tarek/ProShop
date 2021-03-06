const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {products} = require('./data/products');
const multer = require('multer');
const {dotenv} = require('dotenv').config();
const mongoose = require('./config/db');
const {User} = require('./Models/userModel');
const {Product} = require('./Models/productModel');
const {Order} = require('./Models/orderModel');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoute');
const {errorHandler,notFound, erroHandler} = require('./middleware/errorMiddleware');
const bodyParser = require('body-parser');
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(express.static('./uploads'))

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.post('/api/upload',upload.single('image'),(req,res)=>{res.status(200).send(`/${req.file.filename}`);})
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes); 
app.use('/api/orders',orderRoutes);
// app.use('/api/upload',uploadRoutes);
app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'..', 'frontend' ,'build')));
    app.get('*', (req,res) => {
        // console.log(path.join(__dirname,'..', 'frontend' ,'build',  'index.html'));
        res.sendFile(path.join(__dirname,'..', 'frontend' ,'build',  'index.html'))


    })
}else{
    app.get('/',(req,res) => {res.send('API RUNNING');})
}

app.use(notFound);

// Override the error handler middleware
app.use(erroHandler)

app.listen(process.env.PORT || 5000,(e) => {
    if(e){
        console.log(e);
    }
    console.log(`Server Running in ${process.env.NODE_ENV} On PORT ${process.env.PORT}`);
})