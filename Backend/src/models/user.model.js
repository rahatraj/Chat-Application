import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email : String,
    fullName : String,
    password : String,
    profilePicture : {
        type : String,
        default : ""
    }
}, {timestamps : true})

const User = model("User", userSchema)
export default User;