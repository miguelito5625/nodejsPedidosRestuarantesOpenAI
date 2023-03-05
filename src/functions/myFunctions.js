function countLines(variable) {
    // Dividir la variable en un arreglo de líneas
    const lineas = variable.split('\n');
    // Devolver la longitud del arreglo
    return lineas.length;
  }

  function extractJSONFromString(str) {
    try {
      // Buscamos el JSON en el string utilizando una expresión regular
      const match = str.match(/\{[\s\S]*\}/);
      // Si se encontró un match, extraemos el JSON y lo convertimos en objeto
      if (match && match.length > 0) {
        const jsonStr = match[0];
        const jsonObj = JSON.parse(jsonStr);
        return jsonObj;
      }
      // Si no se encontró un match, retornamos null
      return null;
    } catch (e) {
      console.error('Error al extraer el JSON: ', e);
      return null;
    }
  }


  function hasJSONInString(str) {
      const match = str.match(/\{[\s\S]*\}/);
      if (match && match.length > 0) {
        return true;
      }else{
        return false;
      }
  }

  function removeLines(conversation, preTrainingWords, numLinesToDelete) {
    // Separa el texto en líneas individuales
    const conversationLines = conversation.split('\n');
    const preTrainingLines = preTrainingWords.split('\n');
  
    // Encuentra el índice de la primera línea que no está en preTrainingWords
    let firstNonPreTrainingLineIndex = conversationLines.findIndex(line => !preTrainingLines.includes(line));
    if (firstNonPreTrainingLineIndex === -1) {
      // Si todas las líneas están en preTrainingWords, establece el índice en el final del array
      firstNonPreTrainingLineIndex = conversationLines.length;
    }
  
    // Elimina las líneas especificadas a partir del índice encontrado
    conversationLines.splice(firstNonPreTrainingLineIndex, numLinesToDelete);
  
    // Junta las líneas restantes de nuevo en un solo string
    const remainingText = conversationLines.join('\n');
  
    return remainingText;
  }
  
  
  
module.exports = {
    countLines,
    hasJSONInString,
    extractJSONFromString,
    removeLines
}