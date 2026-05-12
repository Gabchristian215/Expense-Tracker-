import express from "express";
import connectDb from "./db.js";
import router from "./router.js";
import {signup, login} from "./auth/authController.js";

const app = express();
const port = 3000;

connectDb();
app.use(express.json());
app.use("/auth", router);
app.use("/signup", signup);
app.use("/login", login)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
