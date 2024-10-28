const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// router.get('/test',(req,res)=>{
//     res.send('User Test Route')
// })

router.get('/register',(req, res)=>{
    res.render('register');
})

router.post('/register'
    ,
    //middleware
    body('email').trim().isEmail().isLength({min:10}),       
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3})
    ,
    async (req, res)=>{                      
    //Controller
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array(),
            message:'Invalid Data'
        })
    }
   const {email, password, username} = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = await userModel.create({
    username,
    email,
    password:hashedPassword
   })
   res.json(newUser);
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min:8}),
    async (req,res)=>{
       
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:'Invalid data'
            })
        }
        const {username,password} =req.body;
        const user = await userModel.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({
                message:'username or password incorrect'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:'username or password incorrect'
            })
        }

        const token = jwt.sign({
            userId : user._id,
            email:user.email,
            username:user.username
        },process.env.JTW_SECRET,
    )
    res.cookie('token',token)
    res.send('Logged In')
        
    }
)

module.exports = router;