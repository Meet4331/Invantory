const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/login_logout';

mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection succesful");
}).catch(()=>{
    console.log("connection fail");
})