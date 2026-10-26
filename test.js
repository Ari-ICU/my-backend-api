require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "fallback_secret_key_2026";

// 1. Sign (Encode) JWT
const payload = { sub: "user_123", role: "editor" };
const token = jwt.sign(payload, secret, {
  expiresIn: "1h",
});

console.log("✅ Encoded JWT Token:\n", token);

// 2. Verify (Decode) JWT
try {
  const decoded = jwt.verify(token, secret);
  console.log("\n✅ Decoded Payload:\n", decoded);
} catch (error) {
  console.error("JWT Verification failed:", error.message);
}