const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 

// Load model
const uploadModel  = require('../models/upload');

const imageData =uploadModel.find({});

const Storage = multer.diskStorage({ 
    destination: "./public/uploads/",
    filename: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    } 
  }); 
  
const upload = multer({
    storage: Storage
}).single('file'    );

router.get('/upload', function(req, res, next) {
   res.render('upload-file', { title: 'Upload File', success:'' });
});

router.post('/upload', upload, function(req, res, next) {
   console.log(req.file.filename)
   var imageFile=req.file.filename;
   var success =req.file.filename+ " uploaded successfully";
  
   var imageDetails= new uploadModel({
    imagename:imageFile
   });

   imageDetails.save(function(err,doc){
   if(err) throw err;
  
   //retreive the image after save
   imageData.exec(function(err,data){
      if(err) throw err;
          res.render('upload-file', { title: 'Upload File', records:data,   success:success });
      });
   }); 
});

router.get('/upload', function(req, res, next) {
    imageData.exec(function(err,data){
      if(err) throw err;
         res.render('upload-file', { title: 'Upload File', records:data, success:'' });
    });
  });

module.exports = router;