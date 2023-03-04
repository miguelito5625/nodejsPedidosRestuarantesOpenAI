function countLines(variable) {
    // Dividir la variable en un arreglo de líneas
    const lineas = variable.split('\n');
    // Devolver la longitud del arreglo
    return lineas.length;
  }

  
module.exports = {
    countLines
}