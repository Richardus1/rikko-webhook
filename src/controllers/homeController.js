const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const RikkoUser = require("../models/RikkoUser");

const muestraPanel = (req, res) => {
  return res.render("home");
};

const addUserForm = (req, res) => {
  res.render("userRegisterForm");
};

const loginForm = (req, res) => {
  res.render("login");
};

const addUser = async (req, res) => {
  //console.log(req.body);
  // variable global importada;
  var myIndex = require("../index");

  const {
    tipoDocumento,
    documentId,
    firstName,
    lastName,
    email,
    phone,
    address,
    password,
    aceptoPoliticas,
  } = req.body;

  try {
    let user = await RikkoUser.findOne({ email });
    if (user) {
      throw new Error("Ya estás registrado, haz login!");
    } else {
      //console.log(myIndex.senderId);
      if (!myIndex.senderId) {
        user = new RikkoUser({
          tipoDocumento,
          documentId,
          firstName,
          lastName,
          email,
          phone,
          address,
          password,
          tokenConfirm: uuidv4(),
          aceptoPoliticas,
        });
        await user.save();
        res.send("Registrado exitosamente");
        //return res.redirect("/login");
      } else {
        user = await RikkoUser.updateOne(
          { facebookId: myIndex.senderId },
          {
            tipoDocumento,
            documentId,
            firstName,
            lastName,
            email,
            phone,
            address,
            password,
            tokenConfirm: uuidv4(),
            aceptoPoliticas,
          },
          function (error, res) {
            if (error) throw new Error("Ocurrión un error inesperado");
            res.send("Registrado exitosamente!!!");
          }
        );
      }
    }
    //enviar email de verificacion
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    async function sendMail() {
      try {
        const accessToken = await oAuth2Client.getAccessToken();
        /* if (Error)
          return console.log(
            "Fallo al conseguir el refreshToken, el correo no se envió"
          ); se cayó al incluir este aviso de error */

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: "La tienda!!! <rikkodigital@gmail.com>",
          to: user.email,
          subject: "Confirma tu cuenta de correo",
          html: `<a href="${
            process.env.PATHHEROKU || "http://localhost:4000"
          }confirmar/${user.tokenConfirm}">Verifica tu cuenta aquí</a>`,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
    sendMail();
    //jwt token
    console.log(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const confirmarCuenta = async (req, res) => {
  const { token } = req.params;

  try {
    user = await RikkoUser.findOne({ tokenConfirm: token });
    if (!user)
      throw new Error("Ya usaste este enlace anteriormente, haz Login ...");

    user.cuentaConfirmada = true;
    user.tokenConfirm = null;
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await RikkoUser.findOne({ email });
    if (!user) throw new Error("Usuario no existe!");

    if (!(await user.comparePassword(password)))
      throw new Error("Credenciales incorrectas!");

    res.send("Logueado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  muestraPanel,
  loginForm,
  addUserForm,
  addUser,
  confirmarCuenta,
  login,
};
