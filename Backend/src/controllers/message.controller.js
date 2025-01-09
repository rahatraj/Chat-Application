import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocket, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


const messageCltr = {}


messageCltr.getUsersForSideBar =  async(req,res) => {
    try {
        const loggedInUser = req.currentUser._id;
        const fillteredUser = await User.find({_id : {$ne : loggedInUser}}).select('-password')
        if(!fillteredUser){
            return res.status(404).json({errors : "No Contacts"})
        }
        return res.status(200).json(fillteredUser)
    } catch (error) {
        return res.status(500).json({errors : 'Something went wrong!'})
    }
}

messageCltr.getMessages = async(req,res)=> {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.currentUser._id;

        const messages = await Message.find({
            $or:[
                {senderId : myId, receiverId : userToChatId},
                {senderId : userToChatId, receiverId : myId}
            ]
        });
        return res.status(200).json(messages)

    } catch (error) {
        return res.status(500).json({errors : 'something went wrong!'})
    }
}

messageCltr.sendMessage = async(req,res) => {
    try {
        const { text, image} = req.body;
        const { id : receiverId} = req.params;
        const senderId = req.currentUser._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            receiverId,
            senderId,
            text,
            image : imageUrl
        })
        await newMessage.save()
        
        // todo : realtime functionality socket.io;
        const receiverSocketId = getReceiverSocket(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        console.log("getting errors while sending the message")
        return res.status(500).json({errors : 'something went wrong!'})
    }
}

export default messageCltr;