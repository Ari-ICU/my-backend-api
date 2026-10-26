const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../validations/validate');
const { createUserSchema, updateUserSchema, addressSchema } = require('../validations/user.validation');

router.route('/')
  .get(userController.getAllUsers)
  .post(validate(createUserSchema), userController.createUser);

router.route('/:id')
  .get(userController.getUserById)
  .put(validate(updateUserSchema), userController.updateUser);

router.route('/:id/addresses')
  .get(userController.getUserAddresses)
  .post(validate(addressSchema), userController.addAddress);

module.exports = router;
