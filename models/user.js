require('dotenv').config();
const mongoose=require('mongoose');
const Joi = require('joi');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

userSchema.methods.generateAuthToken= function(){
    const token=jwt.sign({_id:this._id},process.env.ACCESS_TOKEN_SECRET);//config.get('jwtPrivateKey'));
    return token;
}
const User=mongoose.model('User',userSchema);

function validate(user){

}
exports.User=User;
exports.validate=validate;
