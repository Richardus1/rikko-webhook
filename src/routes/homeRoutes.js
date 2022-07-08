const express = require("express");
const { body } = require("express-validator");
const {
  muestraPanel,
  loginForm,
  addUserForm,
  addUser,
  login,
  confirmarCuenta,
} = require("../controllers/homeController");
const validationRes = require("../midlewares/validationResult");
// const validaUserData = require("../midlewares/validaUserData");
const router = express.Router();

router.get("/", muestraPanel);
router.get("/login", loginForm);
router.post(
  "/login",
  [
    body("email", "Ingresa un email válido")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .escape(),
    body("password", "Mínimo 6 carácteres.")
      .trim()
      .notEmpty()
      .isLength({ min: 6, max: 30 })
      .escape(),
  ],
  login
);
router.get("/addUser", addUserForm);
router.post(
  "/addUser",
  [
    body("tipoDocumento", "Elige tu tipo de documento")
      .trim()
      .notEmpty()
      .escape(),
    body("documentId", "Ingresa un número válido")
      .trim()
      .notEmpty()
      .isNumeric()
      .isLength({ min: 8, max: 15 })
      .escape(),
    body("firstName", "Ingresa un nombre válido")
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .escape(),
    body("lastName", "Ingresa mínimo un apellido")
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .escape(),
    body("email", "Ingresa un email válido")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .escape(),
    body("phone", "Ingresa un número válido")
      .trim()
      .notEmpty()
      .isNumeric()
      .escape(),
    body("address", "Ingresa tu dirección válida")
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 50 })
      .escape(),
    body("password", "Mínimo 6 carácteres.")
      .trim()
      .notEmpty()
      .isLength({ min: 6, max: 30 })
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.rePassword) {
          throw new Error("No coinciden las contraseñas");
        } else {
          return value;
        }
      }),
  ],
  validationRes,
  addUser
);
router.get("/confirmar/:token", confirmarCuenta);

module.exports = router;
