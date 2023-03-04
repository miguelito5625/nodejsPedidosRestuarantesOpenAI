var { clientConversation, preTrainingClient } = require('../globalVars/myVars');
const { countLines } = require('../functions/myFunctions');
const log = require('../functions/customLogs');

clientConversation = 'hola';

log('info', clientConversation);

clientConversation = 'adios';

log('info', clientConversation);

log('info', "Cantidad de lineas de pretraingClient: " + countLines(preTrainingClient));