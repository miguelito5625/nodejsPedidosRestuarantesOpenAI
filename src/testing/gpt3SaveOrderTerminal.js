const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
const { hasJSONInString, extractJSONFromString } = require("../functions/myFunctions");
const { writeData } = require("../functions/firebase");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingWords = 
`Responde a mis clientes diciendo que eres la inteligencia artificial del restaurante la terraza,
platillos del dia:
1. pollo frito a Q20.00
2. Carne a la plancha a Q25.00
3. Pollo horneado a Q35.00,
pregunta que desean y la cantidad,
pregunta si desean algo mas,
pregunta el nombre de la persona y la dirección de entrega,
muestrame un json con los platillos y las cantidades, el total del pedido, nombre de la persona y direccion, ejemplo del json:
>> {"platillos":[{"nombre":"nombre", "cantidad":cantidad, "precio": precio}...], "total":totalpedido, "nombrecomprador":"nombrecomprador", "direccion":"direccion"} <<,
si te piden el total muestralo sin formato json,
la unica forma de pago es al recibir, no preguntes por formas de pago,
cuando te den la dirección no la corrigas,
IMPORTANTE: no generes las respuesta del cliente tu mismo,
la conversación comienza ahora:
`;

// console.log(preTrainingWords);

 pushConversation(preTrainingWords);

function pushConversation(txt){
    conversation += txt + '\n';
}

function clearTokens(){
    conversation = preTrainingWords + ' \n' + conversation.substring(preTrainingWords.length+500);
}

function removeLines(text, linesToRemove) {
    const lines = text.split("\n");
    return [lines[0]].concat(lines.slice(linesToRemove + 1)).join("\n");
  }

console.log(conversation);

const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question("Ingresa tu pregunta: ", async (answer) => {
        pushConversation(answer);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: conversation,
            max_tokens: 300
        });
        if (hasJSONInString(completion.data.choices[0].text)) {
            console.log("Si hay un json!!!!!!!!!!!!!!!!!!!!");
            const order = extractJSONFromString(completion.data.choices[0].text);
            writeData(order);
            console.log(order);
            console.log("Pedido realizado");
            pushConversation("Pedido realizado");
        }else{
            console.log(completion.data.choices[0].text);
            pushConversation(completion.data.choices[0].text);
        }
        
        // console.log("Conversacion:");
        // console.log(conversation);
        // console.log("Tokens: " + conversation.length);
        if (conversation.length > 3500) {
            console.log('limpiando tokens');
            // clearTokens();
            conversation = removeLines(conversation,2);
            console.log("Tokens: " + conversation.length);
        }
        askQuestion();
    });
}

askQuestion();



