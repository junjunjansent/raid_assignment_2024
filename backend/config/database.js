import mongoose from "mongoose"

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.atlas_URI);
        // Mongoose to provide semi scheme to defining data model, (allowable fields and data types)
        console.log('Connected to mongoDB');

    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;