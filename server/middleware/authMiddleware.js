// middleware/authMiddleware.js
import { getAuth } from '@clerk/express';

// Protect middleware to ensure user is authenticated
export const protect = async (req, res, next) => {
  try {
    const { userId, sessionId } = getAuth(req);

    console.log("🔒 Auth middleware called:", {
      userId,
      sessionId,
      path: req.originalUrl,
    });

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not logged in.",
      });
    }

    // Attach user ID to request object for controller use
    req.user = { _id: userId };

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message || error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
