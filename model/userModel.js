const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptr = require('cryptr');
const cryptrKey = new cryptr('secretKey');

const userScheema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{  
        type: String,
        require: true
    },
    tokens:[{
        token:{
            type: String,
            require: true
        }
    }]

});

userScheema.methods.generateTokens = async function(){

    const user = this;
    const tokenTempop = jwt.sign({ id: user._id.toString() }, 'thisisme');
    console.log("temp token"+ tokenTempop);
    //const token = cryptrKey.encrypt(tokenTempop);
    const token = tokenTempop;

    user.tokens = user.tokens.concat({ token });
    try {
        await user.save();
        return token;
    } catch (e) {
        console.log("error");
    }  

}

userScheema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userScheema.statics.findByCredential = async(email, password)=>{
    const user = await User.findOne({ email });
    try{
    if(!user){
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('unable to login');
    }
    return user

}catch(e){
    console.log("error");
}
}

const User = mongoose.model('Login', userScheema);
module.exports = User;          