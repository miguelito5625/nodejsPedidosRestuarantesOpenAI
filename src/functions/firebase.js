
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

async function writeData(order) {
    try {
        const docRef = await db.collection('restaurantes/laterraza/pedidos').add(order);
        console.log('Added document with ID: ', docRef.id);
    } catch (error) {
        console.error('Error al guardar el documento:', error);
    }
}


async function readData() {
    const snapshot = await db.collection('restaurantes/laterraza/pedidos').get();

    try {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    } catch (error) {
        console.error('Error al obtener los documentos:', error);
    }

}


async function deleteAllOrders() {
    const docRef = await db.collection('restaurantes/laterraza/pedidos');
    try {
        // Obtener los documentos de la colección "pedidos"
        const querySnapshot = await docRef.get();

        // Borrar cada documento de la colección
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });

        console.log('Se borraron todos los documentos de la colección "restaurantes/laterraza/pedidos"');
    } catch (error) {
        console.error('Error al borrar los documentos:', error);
    }
}

// deleteAllOrders();

module.exports = {
    writeData,
    readData,
    deleteAllOrders
}