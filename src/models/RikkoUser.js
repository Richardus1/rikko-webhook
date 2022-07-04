const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rikkoUserSchema = new Schema(
  {
    facebookId: {
      type: String,
      default: "",
    },
    tipoDocumento: {
      type: String,
      default: "",
    },
    documentId: {
      type: Number,
      default: null,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      default: "",
    },
    phone: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    tokenConfirm: {
      type: String,
      default: null,
    },
    cuentaConfirmada: {
      type: Boolean,
      default: false,
    },
    aceptoPoliticas: {
      type: String,
      default: "off",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RikkoUser", rikkoUserSchema);
