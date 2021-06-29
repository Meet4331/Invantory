const express =require('express');
const User = require('../model/userModel');
const router = new express.Router();
const auth = require('../middleware/auth');
//const jwt = require('jsonwebtoken')

router.get('/home', (req, res)=>{
    res.send("hello");

});

router.post('/signup', async(req, res)=>{

    const user = await new User(req.body);
    const token = await user.generateTokens();
    try{
    user.save();
    res.send(user);
    res.send('success');
    }
    catch(e){
        res.send('unsuccesful');
    }

})

router.post('/login', auth, async(req, res)=>{

    const user = await User.findByCredential(req.body.email, req.body.password)
    //const token = await user.generateTokens();

    try{
        console.log({ user });
       res.send(user);
    }catch(e){
        res.send("error");
    }
})

module.exports = router;