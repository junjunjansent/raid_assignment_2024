import mongoose from "mongoose";

const user_Schema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        adminRights: { type: Boolean, required: true, default: false,}
    },
    {timestamps: true}
);

const user = mongoose.model('user', user_Schema);
export default user;