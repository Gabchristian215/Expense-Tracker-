import User from "./userSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
    try{
 const newUser = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword

    //add token
 })
 res.status(201).json({
    status: "success",
    data: {
        user: newUser
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
         if (!currentUser || !password){
            return res.status(401).json({
                status: "error",
                message: "invalid username or password"
            });
         }
      

      //3 if everything is ok, send token

    } catch(e){
        res.status(400).json({
            status : "error",
            message: "invaild username or password",
            error: e.message
        })
    }
}

