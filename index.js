import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import authUsers from "./routes/users.js"
import authHotels from "./routes/hotels.js"
import authRooms from "./routes/rooms.js"
const app = express()
dotenv.config()

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to mongodb");
  } catch (error) {
    throw(error);
  }
};

mongoose.connection.on("disconnected", () =>{
    console.log("mongoDB disconnected!");
})


//middlers
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", authUsers);
app.use("/api/hotel", authHotels);
app.use("/api/rooms", authRooms);



app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend!");
})