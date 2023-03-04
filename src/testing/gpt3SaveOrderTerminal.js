const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');
const { hasJSONInString, extractJSONFromString } = require("../functions/myFunctions");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

let conversation = '';

let preTrainingWords = 
`Respondele a mis clientes tomando en cuenta lo siguiente:
somos una tienda con multiples productos,
atendemos 24/7,
preguntar si lo quiere agregar al carrito y cuantas unidades, llevar el control del carrito,
dar el total cada vez que agregue algo al carrito
preguntar si desea algo mas,
si ya no desea nada mas siempre crear un json con los datos del carrito: 
>> {"productos": [{"nombre": "leche","precio": 20.00, "cantidad":2}...] "total": total} << agrega estos delimitadores >> json <<
tenemos los siguientes productos:
1. leche a Q20.00
2. Cereal a Q15.00
3. harina a Q4.00 la libra
la conversacion comienza ahora:

quiero harina
Excelente elección. ¿Cuántas unidades desea?
dos
Hemos agregado 2 unidades de Harina al carrito. ¿Desea algo más?
si
leche una unidad
Hemos agregado 1 unidad de Leche al carrito. ¿Desea algo más?
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
        console.log(completion.data.choices[0].text);
        if (hasJSONInString(completion.data.choices[0].text)) {
            console.log("Si hay un json!!!!!!!!!!!!!!!!!!!!");
            console.log(extractJSONFromString(completion.data.choices[0].text));
        }
        pushConversation(completion.data.choices[0].text);
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



