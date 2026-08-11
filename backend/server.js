import express from "express";
import connectDb from "./db.js";
import router from "./router.js";
import authRouter from "./auth/authRouter.js";


const app = express();
const port = 3000;

connectDb();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/expenses", router);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
