const express = require("express");
const {
  addProductForm,
  loginForm,
  showProduct,
  addProduct,
  eligePago,
} = require("../controllers/apiControllers");
const router = express.Router();

router.get("/login", loginForm);
router.get("/addProduct", addProductForm);
router.post("/addProduct", addProduct);
router.get("/product", showProduct);
router.get("/pago", eligePago);
module.exports = router;
