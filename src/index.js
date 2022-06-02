//librerias
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
//const axios = require("axios");

const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

//files

//DB connection, models
const clientDB = require("./database/dbConnect");
const rikkoUser = require("./models/RikkoUser");

app.get("/", (req, res) => {
  return res.send("Chatbot Funcionando 🤖🤖🤖");
});

app.post("/webhook", express.json(), function (req, res) {
  const agent = new WebhookClient({ request: req, response: res });
  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));
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
  function welcome(agent) {
    agent.add(`Hola! Te damos la bienvenida, me llamo Rikko y tú?`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function probandoWebhook(agent) {
    agent.add(`Saliendo desde Napkin!`);
    agent.add(`Listo para tÍ!`);

    const senderId =
      req.body.originalDetectIntentRequest.payload.data.sender.id;
    const recipientId =
      req.body.originalDetectIntentRequest.payload.data.recipient.id;
    console.log(`Enviado por ${senderId} a ${recipientId}`);

    function saveRikkoUserData(senderId) {
      const RikkoUser = new rikkoUser({
        facebookId: senderId,
        firstName: "",
        lastName: "",
      });
      RikkoUser.save((err, res) => {
        if (err) return console.log("Error al crear usuario", err);
        console.log("Se creó el usuario: ", res);
      });
    }
    saveRikkoUserData(senderId);
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
