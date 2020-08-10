const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/NodeJs-Assignment',{ useNewUrlParser: true ,useUnifiedTopology: true}
  ).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


module.exports=mongoose;


