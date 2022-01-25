const mongoose =require('mongoose');
const Joi =require('mongoose');

const rentalSchema=new mongoose.Schema({

});

const Rental=mongoose.model('Rental',rentalSchema);

function validate(){

}

exports.Rental=Rental;
exports.validate=validate;