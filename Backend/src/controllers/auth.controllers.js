import { ExpressValidator, validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import cloudinary from '../lib/cloudinary.js'

const userCltr = {}

userCltr.register = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const body = req.body;
    try {
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        user.password = await bcryptjs.hash(body.password, salt)

        await user.save()

        return res.status(201).json(user)        
    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}


userCltr.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({errors : 'invalid email or password!'})
        }
        const isVerified = await bcryptjs.compare(password, user.password)
        if(!isVerified){
            return res.status(404).json({errors : 'invalid email or password'})
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY, {expiresIn : '7d'})
        
        const userData = {
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePicture : user.profilePicture,
            createdAt : user.createdAt
        }

        return res.cookie('token', token, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== 'development'
        }).json({ user : userData})

    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}

userCltr.logout = async(req,res) => {
    try {
        res.cookie('token', "", {maxAge : 0});
        return res.status(200).json({message : 'Logged out successfully'})
    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}

userCltr.updateProfile = async (req, res) => {
    
    try {
        const userId = req.currentUser._id;
        const { profilePicture } = req.body;

        console.log("User ID:", userId);
        console.log("Profile Picture:", profilePicture);

        if (!profilePicture) {
            return res.status(400).json({ errors: "Profile Picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ errors: "User not found" });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ errors: "Something went wrong!" });
    }
};


userCltr.checkAuth = async(req,res) => {
    try {
        return res.status(200).json(req.currentUser)
    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}
export default userCltr;