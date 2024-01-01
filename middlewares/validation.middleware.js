/* VALIDATION */
const userValidation = (bot, msg, ALLOWED_ID) => {
  if (msg.from.id != ALLOWED_ID) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Нет доступа... теряйся");
    return false;
  } else {
    return true;
  }
};

export default userValidation;
