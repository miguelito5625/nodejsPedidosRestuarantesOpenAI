const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");
var { clientConversation, preTrainingClient} = require('./globalVars/myVars');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function pushConversation(txt) {
    clientConversation += txt + ' \n';
}

function clearTokens() {
    clientConversation = preTrainingClient + ' \n' + clientConversation.substring(preTrainingClient.length + 500);
}

pushConversation(preTrainingClient);


async function answerMessageGirlFriend(phone, msg) {
    pushConversation(msg);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: clientConversation,
        max_tokens: 300
    });
    pushConversation(completion.data.choices[0].text);
    // return completion.data.choices[0].text;
    const answer = completion.data.choices[0].text;
    client.sendMessage(phone, answer);
    log('info', `Message of ${phone}: ${msg} || AnswerAI: ${answer} || Tokens: ${clientConversation.length}`);
    if (clientConversation.length > 3700) {
        clearTokens();
        log('warning', `Cleaning tokens: ${clientConversation.length}`);
    }
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Whatsapp AI is ready...');
});


client.on('message', message => {
    console.log("Mensaje de:", message.from);
    console.log("Mensaje:", message.body);
    if (message.from === "50251268484@c.us") {
        answerMessageGirlFriend(message.from, message.body);
    }
});


client.initialize();
