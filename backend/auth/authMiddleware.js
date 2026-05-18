import jwt from "jsonwebtoken";
import User from "./userSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const requestLogin = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return res.status(401).json({
                    status: "error",
                    message: "The user belonging to this token no longer exists.",
                });
            }

            req.user = currentUser;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                status: "error",
                message: "Not authorized to access this route",
                error: error.message,
            });
        }
    }

    return res.status(401).json({
        status: "error",
        message: "You are not logged in. Please log in to get access.",
    });
};
