import { exec } from "child_process";

// /START
export const greeting = (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Добро пожаловать, ${msg.from.first_name}! Я готов помогать вам 😘`
  );
};

// /SHUTDOWN
export const shutdown = (bot, msg) => {
  const chatId = msg.chat.id;

  exec("shutdown /s /t 20", (error, stdout, stderr) => {
    if (stderr) {
      console.log(`Возникла ошибка: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, "Устройство будет выключено через 20 сек.");
  });
};

// /RESTART
export const restart = (bot, msg) => {
  const chatId = msg.chat.id;

  exec("shutdown /g /t 0", (error, stdout, stderr) => {
    if (stderr) {
      console.log(`Возникла ошибка: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, "Устройство перезапускается...");
  });
};

// /SLEEP
export const sleep = (bot, msg) => {
  const chatId = msg.chat.id;

  exec(
    "ping -n 2 127.0.0.1 > nul && rundll32.exe powrprof.dll,SetSuspendState 0,1,0",
    (error, stdout, stderr) => {
      if (stderr) {
        console.log(`Возникла ошибка: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, "Устройство переходит в спящий режим...");
    }
  );
};

// /BLUETOOTH-ON
export const bluetoothOn = (bot, msg) => {
  const chatId = msg.chat.id;

  exec("powershell -File ./scripts/bluetooth.ps1 -BluetoothStatus On", (error, stdout, stderr) => {
    if (stderr) {
      console.log(`Возникла ошибка: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, "Блютуз включен.");
  });
};

// /BLUETOOTH-OFF
export const bluetoothOff = (bot, msg) => {
  const chatId = msg.chat.id;

  exec("powershell -File ./scripts/bluetooth.ps1 -BluetoothStatus Off", (error, stdout, stderr) => {
    if (stderr) {
      console.log(`Возникла ошибка: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, "Блютуз выключен.");
  });
};