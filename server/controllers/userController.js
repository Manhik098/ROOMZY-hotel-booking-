import Hotel from "../models/hotelModel.js";

// ✅ GET /api/user - Return user role and recent searched cities
export const getUserData = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // 🔍 Check if user has listed a hotel (via `owner` field)
    const hotel = await Hotel.findOne({ owner: userId });

    const role = hotel ? "hotelOwner" : "user";
    const recentSearchedCities = req.user.recentSearchedCities || [];

    res.json({
      success: true,
      role,
      recentSearchedCities,
    });
  } catch (error) {
    console.error("❌ getUserData error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ POST /api/user/store-recent-search - Store recent search history
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;

    if (!user.recentSearchedCities) {
      user.recentSearchedCities = [];
    }

    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);
    }

    await user.save();

    res.json({ success: true, message: "City added" });
  } catch (error) {
    console.error("❌ storeRecentSearchedCities error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
