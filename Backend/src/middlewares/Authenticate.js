import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";


export const AuthenticatedUser = async(req,res,next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(403).json({errors : 'Unauthenticated user'})
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!tokenData){
            return res.status(403).json({errors : "Unauthenticated user"})
        }

        const user = await User.findById(tokenData.userId).select("-password")

        if(!user){
            return res.status(404).json({errors : 'User not found!'})
        }

        req.currentUser = user;
        next();
    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}

export default AuthenticatedUser;