const config =require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const express=require('express');
const router=express.Router();
const {User,validate}=require('../models/user');

router.post('/',async (req,res)=>{
    // const {error}=validate(req.body);
    // if(error) return res.status.send('Invalid Input');
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid Email or password');
    
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or password');
    const token=user.generateAuthToken();
    res.send(token);
    
});

module.exports=router;