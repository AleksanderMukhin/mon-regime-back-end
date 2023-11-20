const express = require('express');
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/user");

const router = express.Router();

const { register, login } = require("../../controllers/auth")

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;