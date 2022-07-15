const express = require("express");
const { body } = require("express-validator");
const {
  muestraPanel,
  loginForm,
  addUserForm,
  addUser,
  login,
  confirmarCuenta,
  logOut,
} = require("../controllers/homeController");
const refreshToken = require("../midlewares/validaRefreshToken");
const { validaRoles } = require("../midlewares/validaRoles");
const validaToken = require("../midlewares/validaToken");
const { validatorAddUser } = require("../midlewares/validatorAddUser");
const { validatorLogin } = require("../midlewares/validatorLogin");
const router = express.Router();

router.get(
  "/",
  refreshToken,
  validaToken,
  validaRoles(["master", "admin"]),
  muestraPanel
);
router.get("/login", loginForm);
router.post("/login", validatorLogin, login);
router.get("/addUser", addUserForm);
router.post("/addUser", validatorAddUser, addUser);
router.get("/confirmar/:token", confirmarCuenta);
router.get("/logout", logOut);

module.exports = router;
