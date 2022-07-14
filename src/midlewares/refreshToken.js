const jwt = require("jsonwebtoken");
const {
  generateToken,
  tokenVerificatioErrors,
} = require("../utils/tokenManager");

const refreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token, haz login!");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(req.uid);
    //console.log({ token, expiresIn });
    req.token = token;
    req.uid = uid;
    next();
  } catch (error) {
    //.log(error.message);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/login"); //return res.send({ error: tokenVerificatioErrors[error.message] });
  }
};

module.exports = refreshToken;
