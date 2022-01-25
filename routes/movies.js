const auth=require('../middleware/auth');
const express=require('express');
const { Genre } = require('../models/genres');
const router=express.Router();
const {Movie,validate}=require('../models/movies');

router.get('/',async (req,res)=>{
    const movies=Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id',async (req,res)=>{
    const movies=Movie.findById(req.params.id).sort('name');
     res.send(movies);
});
router.post('/',auth,async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send('Invalid input');
    const genre=await Genre.findById(req.body.genreId);
    const movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    const result=await movie.save();
    res.send(result);
});
router.put('/:id',auth,async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send('Invalid input');
    const genre=Genre.findById(req.body.genreId);
    const movie=Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    },{new:true});
    res.send(movie);
});
router.delete('/:id',async (req,res)=>{
    try{
        const result=Movie.findByIdAndDelete(req.params.id);
    }
    catch(e){
        res.status(404).send('Id not found');
    }
    res.send(result);
});
module.exports=router;