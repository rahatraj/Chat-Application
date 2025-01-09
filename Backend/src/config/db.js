import mongoose from 'mongoose'

const configuredDB = async() => {
    try {
        const db = await mongoose.connect(process.env.DB_URL)
        console.log('DB connected successfully')
    } catch (error) {
        console.log('Getting error while connecting db')   
    }
}

export default configuredDB;