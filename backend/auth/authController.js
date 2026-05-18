import User from "./userSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async (req, res) => {
    try{
 const newUser = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword
// hide passwords so it doesnt show in database
 })
 //add token
 const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWTEXPIRESIN});
 console.log(token);
 res.status(201).json({
    status: "success",
    data: {
        user: newUser,
        token
    }
 })
    } catch(e){
        res.status(400).json({
            status: "error",
            message: "cannot create user",
            error: e.message

        })
        console.error("Name:", e.name);
        console.error("Message:", e.message);
        console.error("Stack:", e.stack);
    }
}

export const login = async (req, res) => {
    try {
      //1) check if username and password exist
      const {username, password} = req.body;
      
       if (!username || !password){
        return res.status(400).json({
            status: "error",
            message: "invaild username or password",
        });
       }
       const currentUser = await User.findOne({username}).select('+password');
       console.log(currentUser);
      // 2) check if user exist && password is correct
      if(!currentUser ||!(await currentUser.correctPassword(password, currentUser.password))){
        return res.status(400).json({
            status: "error",
            message: "invaild username or password",
        });
      }
      

      //3 if everything is ok, send token
      const token = jwt.sign({id:currentUser._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWTEXPIRESIN});

      res.status(200).json({
        status: "success",
        token
      })

    } catch(e){
        res.status(400).json({
            status : "error",
            message: "invaild username or password",
            error: e.message
        })
    }
}

