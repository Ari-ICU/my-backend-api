const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../exceptions/appError');
const { UserResponseDTO } = require('../dto');

const JWT_SECRET = process.env.JWT_SECRET || 'ecommerce_jwt_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function generateToken(user) {
  return jwt.sign(
    { sub: user._id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

async function register(data) {
  const { full_name, email, password, phone, role } = data;

  // Check if email already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError('Email is already registered', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const password_hash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    full_name,
    email: email.toLowerCase(),
    password_hash,
    phone,
    role: role || 'customer'
  });

  const token = generateToken(newUser);

  return {
    user: UserResponseDTO.fromEntity(newUser),
    token
  };
}

async function login(data) {
  const { email, password } = data;

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  // Check if account is active
  if (!user.is_active) {
    throw new AppError('Your account has been deactivated', 403);
  }

  const token = generateToken(user);

  return {
    user: UserResponseDTO.fromEntity(user),
    token
  };
}

async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return UserResponseDTO.fromEntity(user);
}

module.exports = {
  register,
  login,
  getMe,
  generateToken
};