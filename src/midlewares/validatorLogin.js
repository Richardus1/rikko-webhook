const { body } = require("express-validator");

const validatorLogin = [
  body("email", "Email: Ingresa un email válido")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Password: Mínimo 6 carácteres.")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 30 })
    .escape(),
];

module.exports = { validatorLogin };
