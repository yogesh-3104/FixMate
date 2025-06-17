import express from "express";
import connectToDB from "./utils/connectToDB.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGODB_URI);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/v1/user", userRoutes);
app.use("/v1/service", serviceRoutes);
app.use("/v1/appointment", appointmentRoutes);
app.use("/v1/review", reviewRoutes);

connectToDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
