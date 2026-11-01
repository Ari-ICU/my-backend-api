const rateLimit =require("express-rate-limit");

// Global limiter: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    status: 429,
    message: `Too many requests from this IP, please try again after 15 minutes`
  }
});



const productLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    status: 429,
    message: `Too many requests from this IP, please try again after 15 minutes`
  }
})

module.exports = {
    globalLimiter,
    productLimiter
}
