const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
Random = require('meteor-random')

// Cloudinary config
cloudinary.config({
    cloud_name:'dz6pgtx3t',
    api_key: '874717479975763',
    api_secret: 'I2uZYCzyRbb3Iyz3_lNOR2RN-7k'
})

router.post('/signup', async (req, res)=>{
    const {name, lastname, email, password, description, topics, profileImage, rating} = req.body
    console.log("Properties", req.body)
    // User sign up
    const emailUser = await UserModel.findOne({email: email})
    if(emailUser){
       console.log('The email is already in use')
    }else{
        let imgUrl
        if (description_img.trim() != ''){
        const path = description_img
        const uniqueFilename = Random.id()
        const cloudinary = require('cloudinary').v2;
        await cloudinary.uploader.upload(path, { public_id: `jobs/${uniqueFilename}`, tags: `jobs` }, (err, result)=> { 
            if (err) {
                req.flash('error_msg', 'Img not correct')
                return res.redirect('/jobs/addJobView') 
            } else {
                //console.log("Cloudinary result", result)
                console.log(result.url)
                imgUrl = result.url
                console.log(imgUrl)
                //updateDescImages(_id, imgUrl)
                fs.unlinkSync(path) 
            }
        });
    } else {
        console.log("Default img")
        imgUrl = "https://res.cloudinary.com/perlapi/image/upload/v1590690450/logo_hkqot2.png"
    }
        // Change user parameters no more
        const newUser = new UserModel({name, lastname, email, password, description, topics})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        return  res.status(200).send({message: 'User created', User: req.body})
    }
})

router.post('/signin', async (req, res) => {
    console.info("Login req.body:")
    console.log(req.body)
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send({auth: false, message: 'No user found'})
    }else{
        const match = await user.matchPassword(req.body.password)
        if(match){
            let token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: 86400 })
            return res.status(200).send({auth: true, message: 'User authenticated', authToken: token})
        }else{
            return res.status(401).send({auth: false, message: 'Incorrect password'})
        }
    }
})

router.post('logout', (req, res) => {
    console.log("User LogOut")
    return res.status(200).send({auth: false, token: null});
})

module.exports = router