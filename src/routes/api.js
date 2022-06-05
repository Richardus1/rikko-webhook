const express = require("express");
const router = express.Router;

router.get("/products", (req, res) => {
  console.log("Página de productos");
});

module.exports = router;
