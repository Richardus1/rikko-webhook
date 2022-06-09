const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    productName: String,
    description: String,
    img: String,
    price: Number,
    variant: String,
    stockIni: Number,
    stockDisp: Number,
    createdBy: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
