const Joi=require('joi');
const mongoose=require ('mongoose');

const customerSchema=new mongoose.Schema({
    isGold: Boolean,
    name:{type:String,require:true},
    phone:{type:String,require:true}
})

const Customer=mongoose.model('Customer',customerSchema);
function validateInput(genre){
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}
exports.Customer=Customer;
exports.validate=validateInput;
