const auth=require('../middleware/auth');
const express=require('express');
const router =express.Router();
const {Customer,validate}=require('../models/customers');
const mongoose=require ('mongoose');

router.get('/',async (req,res)=>{
    const customers=await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id',async (req,res)=>{
    const customers=await Customer.findById(req.params.id);
    res.send(customers);
});

router.post('/',auth,async (req,res)=>{
    const customer=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })
    const result = await customer.save();
    res.send(result);
});
router.put('/:id',auth,async (req,res)=>{
    const customer=await Customer.findById(req.params.id);
    customer.name=req.body.name;
    customer.phone=req.body.phone;
    customer.isGold=req.body.isGold;
    const result = await customer.save();
    res.send(result);
});
router.delete('/:id',async (req,res)=>{
    const result=await Customer.findByIdAndDelete(req.params.id);
    res.send(result);
});

module.exports=router;