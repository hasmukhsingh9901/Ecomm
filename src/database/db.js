import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/carryall");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


export default connectDatabase