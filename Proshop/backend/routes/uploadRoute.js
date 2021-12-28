const multer = require('multer');
const express = require('express');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file,cb){
    const fileTypes = /jpg | jpeg | png/
    const extname =    fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimtype = fileTypes.test(file.mimtype)
    if(extname && mimtype){
        return cb(null, true)
    }else{
        cb('Images Only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/',upload.single('image'),(req,res) => {
     if(!req.file){
         res.status(404).send();
     }
    res.status(200).send(`/${req.file.path}`)
})

module.exports = router;