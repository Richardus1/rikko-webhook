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
  console.log(req.body);
  // let senderId = "123456";
  var myIndex = require("../index");
  //var senderId = myIndex.senderId;
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
      console.log(senderId);
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
          aceptoPoliticas,
        });
        await user.save();
        return res.redirect("/login");

        //enviar email de verificación
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
            aceptoPoliticas,
          }
        );
      }
    }

    /*  let user = await RikkoUser.updateOne(
      { email },
      {
        facebookId: "123123",
        tipoDocumento,
        documentId,
        firstName,
        lastName,
        phone,
        address,
        password,
        aceptoPoliticas,
      }
    ); */
    /*  if (user) {
      throw new Error("Ya registrado, ve al Login");
    } */
    /* 
    user = new RikkoUser({
      tipoDocumento,
      documentId,
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      aceptoPoliticas,
    });
    await user.updateOne(); */
    console.log(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  muestraPanel,
  loginForm,
  addUserForm,
  addUser,
};
