import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3030" : "/"

export const useAuthStore = create((set, get)=> ({
    authUser : null,
    isSigningUp : false,
    isLoggingUp : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,
    onlineUsers : [],
    socket : null,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser : res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Errors in checking auth", error)
            set({authUser : null})
        } finally{
            set({isCheckingAuth : false})
        }
    },

    signup : async(data)=> {
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser : res.data})
            toast.success("Account created Successfully.")
            // get().connectSocket()
        } catch (error) {
            error = error.response.data.errors;
            if (error && Array.isArray(error)) {
                error.forEach((err) => {
                  toast.error(err.msg); // Display each error message
                });
              } else {
                toast.error("An unknown error occurred"); // Fallback for unexpected responses
              }
        } finally{
            set({isSigningUp : false})
        }
    },

    login : async(data) => {
        set({isLoggingUp : true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser : res.data.user})
            toast.success("Logged in Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.errors)
        } finally{
            set({isLoggingUp : false})
        }
    },

    logout : async() => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser : null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.errors)
        }
    },

    updateProfile : async(data) => {
        set({isUpdatingProfile : true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser : res.data})
            toast.success("Profile updated successfully.")
        } catch (error) {
            toast.error(error.response.data.errors)
        } finally{
            set({isUpdatingProfile : false})
        }
    },

    connectSocket : () => {
        const { authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query : {
                userId : authUser._id
            }
        })

        socket.connect()

        set({socket : socket})

        socket.on("getOnlineUsers", (userIds)=> {
            set({onlineUsers : userIds})
        })
    },
    disconnectSocket : () => {
        if(get().socket?.connected) get().socket.disconnect();
    }


}))