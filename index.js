import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import authUsers from "./routes/users.js";
import authHotels from "./routes/hotels.js";
import authRooms from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Mongodb Database");
  } catch (error) {
    throw(error);
  }
};

mongoose.connection.on("disconnected", () =>{
    console.log("Database connected!");
})


//middlers
app.use(cookieParser())
app.use(express.json())
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", authUsers);
app.use("/api/hotel", authHotels);
app.use("/api/rooms", authRooms);

app.use((err, req, res, next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend!");
})




// {
//   "name":"Hotel panshi",
//   "type":"hotel",
//   "city":"sylhet",
//   "address":"somewhere",
//   "distance":"500",
//   "title":"Best hotel in city",
//   "desc":"hotel description",
//   "cheapestPrice":44
//   }