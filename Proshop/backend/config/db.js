const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true },(e) => {
    if(e){
        console.log(`error is: ${e}`);
    }
    console.log('connected');
});

module.exports = {mongoose}; 