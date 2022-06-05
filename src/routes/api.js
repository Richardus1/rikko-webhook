const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  res.send("Página de productos");
});

module.exports = router;
