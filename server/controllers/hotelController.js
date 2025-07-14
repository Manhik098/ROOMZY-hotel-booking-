// controllers/hotelController.js
import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existingHotel = await Hotel.findOne({ owner: userId });
    if (existingHotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    await Hotel.create({ name, address, contact, city, owner: userId });
    await User.findByIdAndUpdate(userId, { role: "hotelOwner" });

    res.status(200).json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
