const express = require('express');
const { validateBody, authenticate } = require("../../middelwares");
const { schemas } = require("../../models/user");

const router = express.Router();

const { register, login, getCurrent, logout } = require("../../controllers/auth")

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post('/logout', authenticate, logout)

module.exports = router;