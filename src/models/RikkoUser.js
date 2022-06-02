const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rikkoUserSchema = new Schema(
  {
    facebookId: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("rikkoUser", rikkoUserSchema);
