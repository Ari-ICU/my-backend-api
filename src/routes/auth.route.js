const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../validations/validate');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
