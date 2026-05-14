import mongoose from "mongoose";
const {Schema} = mongoose;
import bcrypt from "bcrypt"

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
 userSchema.pre('save', async function(next) {
  if(!this.isModified("password")) return next();
 this.password = await bcrypt.hash(this.password, 12);
 }) // hash the password before its stored in DB

const User = mongoose.model("user", userSchema)

export default User;