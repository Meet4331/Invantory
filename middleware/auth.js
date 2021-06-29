const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const auth = async(req, res, next)=>{
    try {
        console.log('in auth ');
        const token = req.header('Authorization').replace('Bearer ','');
        console.log('token from auth ' + token);
        const decoded = jwt.verify(token,'thisisme');
        console.log(decoded);
        const user = await User.findOne({ _id: '60c742b7bf1fad0750a6e5cc' })
        console.log(user);
        if(!user){
            throw new Error('erroer no user found')
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.send('error 404 please authinticate'+ e);
    }    
}

module.exports = auth