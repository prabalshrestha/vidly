const auth=require('../middleware/auth');
const express=require('express');
const router=express.Router();
const {Genre,validate}=require('../models/genres');

router.get('/',async (req,res)=>{
    
    const genres=await Genre.find().sort('name');
    
    res.send(genres);
});

router.get('/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Id not found');
    res.send(genre);
});

router.post('/',auth,async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send('Invalid input');
    const genre=new Genre({
        name:req.body.name
    });
   
    const result=await genre.save();
    res.send(result);  
});


router.put('/:id',auth,async (req,res)=>{
    
    const { error }=validate(req.body);
    if(error) return res.status(400).send('Invalid input');
   // const genre=await Genre.findById(req.params.id);
    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new :true});
    if(!genre) return res.status(404).send('Id not found');
    res.send(genre);
    
    // genre.name=req.body.name;
    // const result= genre.save;

    res.send(genre);
});

router.delete('/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Id not found');
    const result = await genre.delete();
    res.send(result);
});

module.exports =router;