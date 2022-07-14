const { body } = require("express-validator");

const validatorAddUser = [
  body(
    "tipoDocumento",
    "TipoDocumento: Elige si tienes DNI, PASAPORTE, C.E. u Otro"
  )
    .trim()
    .notEmpty()
    .escape(),
  body("documentId", "NúmeroDocumento: Ingresa un número válido")
    .trim()
    .notEmpty()
    .isNumeric()
    .isLength({ min: 8, max: 15 })
    .escape(),
  body("firstName", "Nombre: Ingresa un nombre válido")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 30 })
    .escape(),
  body("lastName", "Apellidos: Ingresa mínimo un apellido")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 30 })
    .escape(),
  body("email", "Email: Ingresa un email válido")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("phone", "Teléfono: Ingresa un número válido")
    .trim()
    .notEmpty()
    .isNumeric()
    .escape(),
  body("address", "Dirección: Ingresa tu dirección válida para entrega")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 50 })
    .escape(),
  body("password", "Password: Mínimo 6 carácteres.")
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
];

module.exports = {
  validatorAddUser,
};
