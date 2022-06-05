const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  productName: String,
  description: String,
});
