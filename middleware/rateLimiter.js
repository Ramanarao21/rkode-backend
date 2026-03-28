import rateLimit from "express-rate-limit";

// Strict limiter for admin data
export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, 
  message: {
    success: false,
    error: "Too many requests. Try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
