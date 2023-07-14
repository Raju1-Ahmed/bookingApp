import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) =>{
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}
export const updateHotel = async (req, res, next) =>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    }
}
export const deleteHotel = async (req, res, next) =>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel han been deleted.")
    } catch (err) {
       next(err)
    }
}
export const getHotel = async (req, res, next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}


// Define the getHotels function when it,s not working then use below alternative code
// export const getHotels = async (req, res, next) => {
//     const { min, max, ...others } = req.query;
//     try {
//       const hotels = await Hotel.find({
//         ...others,
//         cheapestPrice: { $gt: min || 1, $lt: max || 200 },
//       }).limit(parseInt(req.query.limit) || 7);
//       res.status(200).json(hotels);
//     } catch (err) {
//       next(err);
//     }
//   };
// Below alternative code for GetHotel

// Define the getHotels function
export const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    try {
      const query = { ...others };
  
      if (min !== undefined && max !== undefined) {
        query.cheapestPrice = { $gt: Number(min) || 1, $lt: Number(max) || 999 };
      } else if (min !== undefined) {
        query.cheapestPrice = { $gt: Number(min) || 1 };
      } else if (max !== undefined) {
        query.cheapestPrice = { $lt: Number(max) || 999 };
      }
  
      const hotels = await Hotel.find(query).limit(parseInt(limit) || 7);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };



export const countByCity = async (req, res, next) =>{
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType = async (req, res, next) =>{
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel"});
      const apartmentCount = await Hotel.countDocuments({ type: "apartment"});
      const resortCount = await Hotel.countDocuments({ type: "resort"});
      const villaCount = await Hotel.countDocuments({ type: "villa"});
      const cabinCount = await Hotel.countDocuments({ type: "cabin"});

      res.status(200).json([
        {type: "hotel", count: hotelCount},
        {type: "apartment", count: apartmentCount},
        {type: "resort", count: resortCount},
        {type: "villa", count: villaCount},
        {type: "cabin", count: cabinCount},
      ])
    } catch (err) {
        next(err)
    }
}


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};