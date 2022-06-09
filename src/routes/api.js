const express = require("express");
const {
  addProductForm,
  loginForm,
  showProduct,
  addProduct,
} = require("../controllers/apiControllers");
const router = express.Router();

router.get("/login", loginForm);
router.get("/addProduct", addProductForm);
router.post("/addProduct", addProduct);
router.get("/product", showProduct);
module.exports = router;
