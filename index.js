const TelegramBot = require('node-telegram-bot-api');
const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
     apiKey: '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',
});

const openai = new OpenAIApi(configuration);
// console.log(openai);
const token = '6140076990:AAGG1gG-hycyw2SifrUcCgpHjDK1dMkvEys';

const bot = new TelegramBot(token, {polling:true});
// console.log(bot);

bot.on("message", async (msg) => {
     // console.log(msg);
     const chatId = msg.chat.id;
     const userInput = msg.text;
     const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: userInput,
          temperature: 0,
          max_tokens: 3000,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
     });
     console.log(response);
     console.log(response.data);
     const generatedText = response.data.choices[0].text;
     bot.sendMessage(chatId, generatedText);
});