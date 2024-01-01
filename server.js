import TelegramBot from "node-telegram-bot-api";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import userValidation from "./middlewares/validation.middleware.js";
import {
  greeting,
  shutdown,
  restart,
  sleep,
  bluetoothOn,
  bluetoothOff,
} from "./controllers/bot.controller.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

/* REQUESTS */
bot.on("message", (msg) => {
  if (userValidation(bot, msg, process.env.ALLOWED_ID)) {
    switch (msg.text) {
      case "/start":
        greeting(bot, msg);
        break;

      case "/sleep":
        sleep(bot, msg);
        break;

      case "/restart":
        restart(bot, msg);
        break;

      case "/shutdown":
        shutdown(bot, msg);
        break;

      case "/bluetooth-on":
        bluetoothOn(bot, msg);
        break;

      case "/bluetooth-off":
        bluetoothOff(bot, msg);
        break;
      default:
        bot.sendMessage(msg.chat.id, "Комманда введена неверно :(");
        console.log(msg.text)
        break;
    }
    /*  msg.text === "/turnOff" ? turnOff(bot, msg) : "";
    msg.text === "/restart" ? restart(bot, msg) : "";
    msg.text === "/start" ? greeting(bot, msg) : "";
    msg.text === "/sleep" ? sleep(bot, msg) : ""; */
  }
});
