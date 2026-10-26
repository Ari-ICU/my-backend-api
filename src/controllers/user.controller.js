const userService = require('../services/user.service');
const AppError = require('../exceptions/appError');
const { UserResponseDTO } = require('../dto');

async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: UserResponseDTO.fromEntity(user)
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: UserResponseDTO.fromEntities(users)
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({
      success: true,
      data: UserResponseDTO.fromEntity(user)
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({
      success: true,
      data: UserResponseDTO.fromEntity(user)
    });
  } catch (error) {
    next(error);
  }
}

async function addAddress(req, res, next) {
  try {
    const addresses = await userService.addAddress(req.params.id, req.body);
    res.status(201).json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
}

async function getUserAddresses(req, res, next) {
  try {
    const addresses = await userService.getUserAddresses(req.params.id);
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  addAddress,
  getUserAddresses
};
