const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config =require('../config/default.json')
const {check,validationResult} = require('express-validator')
const User=require('../models/User')
const router = Router();

router.post('/register',
    [
        check('email','uncorrect').isEmail(),
        check('password','uncorrect').isLength({min:6})
    ],
    async (req,res)=>{
    try{
        console.log('Body'+req.body)
        const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'uncorrect data'
            })
        }

        const {email,password}=req.body
        const candidate = await User.findOne({email})
        if(candidate){
           return  res.status(400).json({message:'this used already'})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({message:'User created'})
    } catch(e){
        res.status(500).json({message:'something wrong'})
    }
})
router.post('/login',
    [
        check('email','uncorrect').normalizeEmail().isEmail(),
        check('password','uncorrect').exists()
    ],
    async (req,res)=>{
        try{
            const errors =validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:'uncorrect login'
                })
            }

            const {email,password}=req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password,user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }
            console.log('norm')
            const token = jwt.sign(
                { userId: user.id },
                'jwtSecret',
                { expiresIn: '1d' }
            )
            console.log(token)
            res.json({ token, userId: user.id })
        } catch(e){
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
})

module.exports=router