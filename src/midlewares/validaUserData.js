const express = require("express");
const { body, validationResult } = require("express-validator");

const validaUserData = (req, res, next) => {
  [
    body("tipoDocumento", "Elige tu tipo de documento")
      .trim()
      .notEmpty()
      .escape(),
    body("documentId", "Ingresa un número válido")
      .trim()
      .notEmpty()
      .isNumeric({ min: 8, max: 15 })
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
          value;
          return next();
        }
      }),
  ];
};

module.exports = validaUserData;
