const {
  validateNickName,
  validateEmail,
  validatePassword,
  validateNumber,
} = require("../microservices/validationsService");
const { insertUser, getUser } = require("../microservices/userService");
const { getConnection, sql } = require("../database/dbConnection.js");

const registerUser = async (data) => {
  try {
    const { NickName, Correo, Clave, Nivel } = data;

    //Validar si el nickName cumple con las reglas
    const nickVal = validateNickName(NickName);
    if (nickVal != true) {
      return nickVal;
    }

    //Validar si el correo cumple con las reglas
    const correoVal = validateEmail(Correo);
    if (correoVal != true) {
      return correoVal;
    }

    //Validar si el clave cumple con las reglas
    const claveVal = validatePassword(Clave);
    if (claveVal != true) {
      return claveVal;
    }

    //Validar si el clave cumple con las reglas
    const nivelVal = validateNumber(Nivel);
    if (nivelVal != true) {
      return nivelVal;
    }

    //Los datos del usuario cumplen con todas las reglas

    //Registrar el usuario
    const res = await insertUser(data);

    return res;
  } catch (error) {
    return { error: "Error al registrar usuario.", response: error };
  }
};

const login = async (data) => {
  try {
    //Validar si el correo cumple con las reglas
    const correoVal = validateEmail(data.Correo);
    if (correoVal != true) {
      return correoVal;
    }

    //Validar si el clave cumple con las reglas
    const claveVal = validatePassword(data.Clave);
    if (claveVal != true) {
      return claveVal;
    }

    const res = await getUser(data);

    return res;
  } catch (error) {
    return { error: "Error al loguear usuario.", response: error };
  }
};

const editUser = async (UsuarioID, data) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de actualización
    const query = `UPDATE Usuarios SET NickName = @valorNickName, Correo = @valorCorreo, Clave = @valorClave, Imagen = @valorImagen WHERE UsuarioID = @usuarioID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("valorNickName", sql.VarChar, data.NickName);
    request.input("valorCorreo", sql.VarChar, data.Correo);
    request.input("valorClave", sql.VarChar, data.Clave);
    request.input("valorImagen", sql.VarChar, data.Imagen);
    request.input("usuarioID", sql.Int, UsuarioID);

    // Ejecutar la consulta SQL de actualización
    const result = await request.query(query);

    console.log("Registro actualizado:", result);
    return { status: true, content: data };
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

module.exports = { registerUser, login, editUser };
