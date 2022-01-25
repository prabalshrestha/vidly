const jwt=require('jsonwebtoken');


function auth(req,res,next){
    const authHeader=req.header('authorization');
    const token =authHeader && authHeader.split(' ')[1];
    
    if(!token) return res.status(401).send('Access denied token not found');
    try{
        const decode=jwt.verify(token,'djfhjdfh');
        req.user=decode;
        next();
    }catch(ex){
        res.status(401).send('invalid Token');
    }
}

module.exports=auth;