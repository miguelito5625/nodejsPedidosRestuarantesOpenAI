const { hasJSONInString, extractJSONFromString } = require("../functions/myFunctions");

const response = `Muy bien. Aquí hay un JSON con los detalles del carrito:

{"productos": [{"nombre": leche,"precio": 20.00, "cantidad":1}, {"nombre":harina,"precio": 4.00, "cantidad":2}], "total": 28.00}

Gracias por elegirnos para su compra, ¡vuelva pronto!`;

if (hasJSONInString(response)) {
    console.log("Si hay json !!!!!!!");
    console.log(extractJSONFromString(response));
}else{
    console.log("No hay json !!!!!!!");
}