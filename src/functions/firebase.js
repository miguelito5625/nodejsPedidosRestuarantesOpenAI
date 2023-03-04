
const { async } = require('@firebase/util');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("../../serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


// db.collection("restaurantes/laterraza/pedidos").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });

async function writeData() {
    const docRef = await db.collection('restaurantes/laterraza/pedidos').add({
        platillos: [
            {
                nombre: 'pollo',
                precio: 20.00
            },
            {
                nombre: 'carne',
                precio: 25.00
            }
        ],
        direccion: 'quirigua',
        total: 45.00
    });
    console.log('Added document with ID: ', docRef.id);
}


async function readData() {
    const snapshot = await db.collection('restaurantes/laterraza/pedidos').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}

writeData();