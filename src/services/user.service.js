const User = require('../models/user.model');

async function createUser(data) {
  return await User.create(data);
}

async function getAllUsers(filter = {}) {
  return await User.find(filter).select('-password_hash');
}

async function getUserById(id) {
  return await User.findById(id).select('-password_hash');
}

async function updateUser(id, updateData) {
  return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password_hash');
}

async function addAddress(userId, addressData) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  
  if (addressData.is_default) {
    user.addresses.forEach(addr => addr.is_default = false);
  }
  user.addresses.push(addressData);
  await user.save();
  return user.addresses;
}

async function getUserAddresses(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user.addresses;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  addAddress,
  getUserAddresses
};
