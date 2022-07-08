const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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

rikkoUserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash de contraseña");
  }
});

rikkoUserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("RikkoUser", rikkoUserSchema);
