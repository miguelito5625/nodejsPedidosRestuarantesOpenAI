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

  function removeLines(text, linesToRemove) {
    const lines = text.split("\n");
    return [lines[0]].concat(lines.slice(linesToRemove + 1)).join("\n");
  }

  
module.exports = {
    countLines,
    hasJSONInString,
    extractJSONFromString,
    removeLines
}