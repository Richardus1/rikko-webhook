const express = require("express");
const {
  addProductForm,
  showProduct,
  addProduct,
  eligePago,
} = require("../controllers/apiController");
const router = express.Router();

router.get("/addProduct", addProductForm);
router.post("/addProduct", addProduct);
router.get("/product", showProduct);
router.get("/pago", eligePago);

module.exports = router;
