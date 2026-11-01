


const allowedOrigins = [
  "https://mywebapplication.com",
  "https://admin.mywebapplication.com"
];

const isLocalOrigin = (origin) => {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
};

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, curl, Postman, configured origins, or local development (localhost / 127.0.0.1)
    if (!origin || allowedOrigins.includes(origin) || isLocalOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS policy"));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-folder"],
  maxAge: 86400, // Preflight cache for 24 hours
};

module.exports = corsOptions;