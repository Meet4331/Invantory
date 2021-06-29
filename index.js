const express = require('express');
const router = require('./router/routers');
const model = require('./model/userModel')
require('./db/mongoose');


const app = express();
const port = 3000;
// app.use((req, res, next)=>{
//     if(req.method === 'POST'){
//         console.log('get request are block');
//     }else{
//         console.log('in else block');;
//         next()
//     }
// })

app.use(express.json());
console.log(port);
app.use(router);

app.listen(port, ()=>{
    console.log("runnimmg on "+port);
})
