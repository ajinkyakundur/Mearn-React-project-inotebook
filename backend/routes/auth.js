
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'hithisisajinkya';


//Route 1: create a user using: POST: "/api/auth/createuser". No login Requird
router.post('/createuser', [
    body('name','Enter a Valid Name').isLength({min:3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password must be atleast 5 charachters').isLength({ min:5})
], async(req, res)=>{
 //if   there are errors, return Bad reuest and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  try{
  // check wheather the user exists already
  let user = await User.findOne({email: req.body.email});
  if(user){
     return res.status(400).json({error:"sorry a uesr with this email is already exists"})
  }

 const salt= await bcrypt.genSalt(10);
 const secPass = await bcrypt.hash(req.body.password, salt)
  //create a new user
  user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email
  })

  const data ={
    user:{
        id: user.id
    }
  }
const authtoken= jwt.sign(data, JWT_SECRET);
// console.log(jwtdata);

  
//   .then(user => res.json(user))
//   .catch(err=> {console.log(err)
//     res.json({error:'please enter unique email value'})})
//   console.log(req.body);
//   const user= User(req.body);
//   user.save();
  res.json(authtoken)
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}
})


//Route 2: Authenticate a user using: POST: "/api/auth/login". No login Requird
router.post('/login', [
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password cannot be blank').exists()
], async(req, res)=>{

//if there are error, return bad request and the error
const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
const {email,password} = req.body;
try {
    let user = await User.findOne({email});
    if(!user)
    {
        return res.status(400).json({error: "Please enter the correct crendential"});
    }

    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error: "Please enter the correct crendential"});
    }

    const data ={
        user:{
            id: user.id
        }
      }
    const authtoken= jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
} catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}
})

//Route 3:Get Loged in User Details using: POST: "/api/auth/getuser".  login Requird
router.post('/getuser', fetchuser , async(req, res)=>{

try {
    userId = req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user)
    
} catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}

})

module.exports = router