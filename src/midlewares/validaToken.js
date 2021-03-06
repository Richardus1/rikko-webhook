const jwt = require("jsonwebtoken");
const { tokenVerificatioErrors } = require("../utils/tokenManager");

const validaToken = (req, res, next) => {
  try {
    const token = req.token;
    //console.log(token + "valida el original");
    if (!token) throw new Error("no bearer");
    //token = token.split(" ")[1];
    const { uid, urole } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.urole = urole;
    next();
  } catch (error) {
    //console.log(error.message);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/login");
    //return res.send({ error: tokenVerificatioErrors[error.message] });
  }
};

module.exports = validaToken;
