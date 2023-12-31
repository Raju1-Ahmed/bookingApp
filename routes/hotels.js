import express from "express"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
// router.post("/", verifyAdmin, createHotel)
router.post("/", createHotel)

//UPDATE
router.put("/:id",verifyAdmin, updateHotel)

//DELETE
// router.delete("/delete/:id",verifyAdmin, deleteHotel)
router.delete("/:id",deleteHotel)

//GET
router.get("/find/:id", getHotel)

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/singleRoom/:id", getHotelRooms);



export default router
