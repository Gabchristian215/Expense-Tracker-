import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    confirmedPassword:{
        type: String,
        required: true,
        minlength: 8,
    },
    createdAt: Date

})

const User = mongoose.model("user", userSchema)

export default User;