import "dotenv/config"; 
import mongoose from "mongoose";


const url = process.env.MONGODB_URI
const connectDb = () =>{
mongoose.connect(url)
. then(() =>{
    console.log("connected to MongoDB");
})
.catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
})
}

export default connectDb;