//librerias
const express = require("express");

const { create } = require("express-handlebars");
const app = express();
const dotenv = require("dotenv").config();
//const axios = require("axios");

const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

//files

//DB connection, models
require("./database/dbConnect");
const rikkoUser = require("./models/RikkoUser");

//view engine
const hbs = create({
  extname: ".hbs",
  partialsDir: ["src/views/partials"],
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", require("./routes/apiRoutes"));
app.use("/", require("./routes/homeRoutes"));

/* var senderId;
exports.senderId = senderId; */

app.post("/webhook", express.json(), function (req, res) {
  const agent = new WebhookClient({ request: req, response: res });
  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  //registra usuario
  senderId = req.body.originalDetectIntentRequest.payload.data.sender.id;
  exports.senderId = senderId;

  const recipientId =
    req.body.originalDetectIntentRequest.payload.data.recipient.id;
  console.log(`Enviado por ${senderId} a ${recipientId}`);

  async function saveRikkoUserData(senderId) {
    const registeredUser = await rikkoUser.findOne({ facebookId: senderId });
    if (registeredUser) return;

    //const userData = await getUserData(senderId); para firstName: userData.first_name

    const RikkoUser = new rikkoUser({
      facebookId: senderId,
    });

    RikkoUser.save((err, res) => {
      if (err) return console.log("Error al crear usuario", err);
      console.log("Se creó el usuario: ", res);
    });
  }
  saveRikkoUserData(senderId);
  //conseguir nombres
  /* const senderId = req.body.originalDetectIntentRequest.payload.data.sender.id;
  console.log(senderId);
  const user = 2441488639318921;
  const PAGE_ACCESS_TOKEN =
    "EAAS9O0tGOMoBAKpnZAqmTq5ZBjkmCbgbmYQ1QzOmOR26pmgJcXYZBUgqx0Gnh5nSFa9iJjTXvmba7eWffTJjZCcFS2dgyfUHD1PqDndDxxg6V68fA5JzmgzUexrQpZAgWyHQtFNVhQfSJzxduONN8RnAfqV7s26X0XpJBPYzAaAJE2pxPbBCEueQswbii6j8mavxsZCcM8eUKDQbdDY1ktrlVfCjgMZAPoLTi4KH42tigZDZD";

  async function getUserData() {
    console.log("consiguiendo datos del usuario...");

    try {
      const userData = await axios.get(
        `https://graph.facebook.com/${user}?fields=first_name,last_name&access_token=${PAGE_ACCESS_TOKEN}`
      );
      const nombre = userData.data.first_name;
      console.log(nombre);
      return console.log(userData.data); //aumenté el concole...
    } catch (err) {
      console.log("algo salio mal en axios getUserData: ", err);
      return {
        first_name: "",
        last_name: "",
        profile_pic: "",
      };
    }
  }
  getUserData();
 */
  /*  

  async function sendTextMessage(recipientId, text) {
    if (text.includes("{first_name}") || text.includes("{last_name}")) {
      let userData = await getUserData(recipientId);
      text = text
        .replace("{first_name}", userData.first_name)
        .replace("{last_name}", userData.last_name);
    }
    var messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        text: text,
      },
    };
    await callSendAPI(messageData);
  } */

  //hasta aquí
  async function welcome(agent) {
    let random;
    let max = 6;
    function findRandom() {
      random = Math.floor(Math.random() * max); //Finds number between 0 - max
      console.log(random);
    }
    findRandom();

    const saludosNuevos = [
      "Hola! Nos alegra tu visita, podemos ayudarte?",
      "Hola! Eres nuevo por aquí, podemos ayudarte?",
      "Hi! Es un gusto darte la bienvenida!!!",
      "Buen día! Es muy grato recibir a un nuevo usuario",
      "Hola, nos hace felices darte la bienvenida!",
      "Hola nuevo! Podemos hacer algo por tí?",
    ];

    const saludosRegistrados = [
      `Hola! Nos alegra verte nuevamente por aquí`,
      `Verte nuevamente... es muy grato! Podemos servirte?`,
      `Hola, regresaste! Te ayudamos hoy?`,
      `Nuevamente recibe la bienvenida! Podemos ayudarte?`,
      `No imaginas la alegria que nos da recibirte nuevamente!`,
      `Tu regreso, nos anima! En qué podemos servirte?`,
    ];

    const registeredUser = await rikkoUser.findOne({ facebookId: senderId });
    if (registeredUser) agent.add(saludosRegistrados[random]);
    else agent.add(saludosNuevos[random]);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function probandoWebhook(agent) {
    agent.add(`Saliendo desde Napkin!`);
    agent.add(`Listo para tÍ!`);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("probandoWebhook", probandoWebhook);

  agent.handleRequest(intentMap);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Corriendo en el puerto: ", port);
});
