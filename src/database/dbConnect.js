const mongoose = require("mongoose");
require("dotenv").config();

const clientDB = mongoose
  .connect(process.env.URI)
  .then((m) => {
    console.log("DB conectada 👌");
    return m.connection.getClient(); //agregado para sessions con mongo-connect?
  })
  .catch((e) => {
    console.log("Error de conección a DB" + e);
  });

module.exports = clientDB;
