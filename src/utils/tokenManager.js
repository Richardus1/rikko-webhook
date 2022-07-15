const jwt = require("jsonwebtoken");

const generateToken = (uid, urole) => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid, urole }, process.env.JWT_SECRET, {
      expiresIn,
    });
    //console.log(token, expiresIn);
    return { token, expiresIn };
  } catch (error) {
    //console.log(error);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/login");
  }
};

const generateRefreshToken = (uid, urole, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ uid, urole }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    //console.log(error);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/login");
  }
};

const tokenVerificatioErrors = {
  "invalid signature": "Firma de JWT no válida!",
  "jwt expired": "JWT Expiró",
  "invalid token": "Token no válido",
  "no bearer": "Usa el formato Bearer",
};

module.exports = {
  generateToken,
  generateRefreshToken,
  tokenVerificatioErrors,
};
