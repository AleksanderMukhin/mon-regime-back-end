const express = require('express');

const router = express.Router();

const exercises = require("../../models/exercises.json");

router.get("/", (req, res) => {
  res.json(exercises)
})

module.exports = router;