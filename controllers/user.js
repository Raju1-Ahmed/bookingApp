import User from "./../models/User.js"

export const updateUser = async (req, res, next) =>{
    try {
        const updateHotel = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    }
}
export const deleteUser = async (req, res, next) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel han been deleted.")
    } catch (err) {
       next(err)
    }
}
export const getUser = async (req, res, next) =>{
    try {
        const hotel = await User.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
export const getUsers = async (req, res, next) =>{
    try {
        const hotels = await User.find();
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}