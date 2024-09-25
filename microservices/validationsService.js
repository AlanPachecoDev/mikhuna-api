
function validateNickName(name) {
  // Expresión regular para validar el name
  const patron = /^[A-Za-zñÑ\s]{2,50}$/;

  // Verificar si el name cumple con el patrón
  if (patron.test(name)) {
    return true; // El name es válido
  } else {
    let error = "";
    // Verificar la longitud
    if (name.length < 2 || name.length > 50) {
      error = "El nombre debe tener entre 2 y 50 caracteres.";
    }
    // Verificar la presencia de símbolos
    else if (!/^[A-Za-zñÑ\s]+$/.test(name)) {
      error = "El nombre no debe contener símbolos.";
    }

    return error;
  }
}

function validateEmail(email) {
  // Expresión regular para validar el email electrónico
  const patron = /^[a-zA-Z0-9_.+-ñÑ]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  // Verificar si el email cumple con el patrón
  if (patron.test(email)) {
    return true; // El email es válido
  } else {
    return false; // El email es inválido
  }
}

function validatePassword(password) {
  // Validar longitud mínima y máxima
  if (password.length < 8 || password.length > 30) {
    return "El password debe tener entre 8 y 30 caracteres.";
  }

  // Validar presencia de al menos un número
  if (!/\d/.test(password)) {
    return "El password debe contener al menos un número.";
  }

  // El password cumple con todas las reglas
  return true;
}

function validateNumber(variable) {
    if (typeof variable === 'number' && !isNaN(variable)) {
      return true; // La variable es un número válido
    } else {
      return "Is not a number"; // La variable no es un número válido
    }
  }

module.exports = { validateNickName, validateEmail, validatePassword, validateNumber, validateNumber };
