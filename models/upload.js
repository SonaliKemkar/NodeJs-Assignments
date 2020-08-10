const mongoose = require('mongoose');

// const ProfileSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true
//   },
//   lastname: {
//     type: String,
//     required: true
//   },
//   img: { 
//         data: Buffer, 
//         contentType: String 
//     } 
// });

// const imageSchema = new mongoose.Schema({ 
//   name: String, 
//   desc: String, 
//   img: 
//   { 
//       data: Buffer, 
//       contentType: String 
//   } 
// }); 

const uploadSchema =new mongoose.Schema({
	imagename: String,

});

var uploadModel = mongoose.model('uploadimage', uploadSchema);
module.exports=uploadModel;

