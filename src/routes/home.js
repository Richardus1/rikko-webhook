const express = require("express");
const { muestraPanel } = require("../controllers/homeController");
const router = express.Router();

router.get("/", muestraPanel);

module.exports = router;
