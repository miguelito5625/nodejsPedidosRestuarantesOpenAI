function countLines(variable) {
    // Dividir la variable en un arreglo de líneas
    const lineas = variable.split('\n');
    // Devolver la longitud del arreglo
    return lineas.length;
  }

  // function extractJSONFromString(str) {
  //   try {
  //     // Buscamos el inicio del JSON
  //     const startIndex = str.indexOf('{');
  //     // Buscamos el final del JSON
  //     const endIndex = str.lastIndexOf('}');
  //     // Extraemos el JSON
  //     const jsonStr = str.substring(startIndex, endIndex + 1);
  //     // Convertimos el JSON en objeto
  //     const jsonObj = JSON.parse(jsonStr);
  //     // Retornamos el objeto
  //     return jsonObj;
  //   } catch (e) {
  //     console.error('Error al extraer el JSON: ', e);
  //     return null;
  //   }
  // }

  // function extractJSONFromString(str) {
  //   try {
  //     // Buscamos el inicio del JSON
  //     const startIndex = str.indexOf('{');
  //     // Buscamos el final del JSON
  //     const endIndex = str.lastIndexOf('}');
  //     // Extraemos el JSON
  //     const jsonStr = str.substring(startIndex, endIndex + 1).replace(/'/g, '"');
  //     // Convertimos el JSON en objeto
  //     const jsonObj = JSON.parse(jsonStr);
  //     // Retornamos el objeto
  //     return jsonObj;
  //   } catch (e) {
  //     console.error('Error al extraer el JSON: ', e);
  //     return null;
  //   }
  // }

  // function extractJSONFromString(str) {
  //   try {
  //     // Buscamos el inicio del JSON
  //     const startIndex = str.indexOf('>>');
  //     // Buscamos el final del JSON
  //     const endIndex = str.lastIndexOf('<<');
  //     // Extraemos el JSON
  //     const jsonStr = str.substring(startIndex + 2, endIndex).trim();
  //     // Convertimos el JSON en objeto
  //     const jsonObj = JSON.parse(jsonStr);
  //     // Retornamos el objeto
  //     return jsonObj;
  //   } catch (e) {
  //     console.error('Error al extraer el JSON: ', e);
  //     return null;
  //   }
  // }

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
  
  
  

  // function hasJSONInString(str) {
  //   try {
  //     // Buscamos el inicio del JSON
  //     const startIndex = str.indexOf('{');
  //     // Buscamos el final del JSON
  //     const endIndex = str.lastIndexOf('}');
  //     // Comprobamos si se encontró el JSON
  //     return startIndex !== -1 && endIndex !== -1;
  //   } catch (e) {
  //     // console.error('Error al verificar si hay un JSON en el string: ', e);
  //     return false;
  //   }
  // }
  
  

  
module.exports = {
    countLines,
    hasJSONInString,
    extractJSONFromString
}