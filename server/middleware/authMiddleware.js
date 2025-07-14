// middleware/authMiddleware.js
import { getAuth } from '@clerk/express';

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    console.log("🔒 Auth middleware called. userId:", userId);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = { _id: userId }; // ✅ Set this for controller to use
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Auth failed" });
  }
};

