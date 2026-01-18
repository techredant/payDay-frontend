import mongoose from "mongoose"

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@payday.lebh4zm.mongodb.net/?appName=Payday`

if (!connectionString) {
    throw new Error('Please define the MONGO_URL environment')
}

const connectDB = async() => {
    if(mongoose.connection?.readyState >= 1) {

        return
    }

    try {
        console.log("--- Connecting to MongoDB ---");
        await mongoose.connect(connectionString)
    } catch (error) {
        console.log("Error connecting mongoDB: ", error)
    }
}

export default connectDB;