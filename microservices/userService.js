const { getConnection, sql } = require("../database/dbConnection.js");

const insertUser = async (data) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de inserción
    const query = `INSERT INTO Usuarios (NickName, Correo, Clave, Nivel) VALUES (@valorNickName, @valorCorreo, @valorClave, @valorNivel)`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("valorNickName", sql.VarChar, data.NickName);
    request.input("valorCorreo", sql.VarChar, data.Correo);
    request.input("valorClave", sql.VarChar, data.Clave);
    request.input("valorNivel", sql.Int, data.Nivel);

    // // {"UsuarioID":0,"NickName":"Oda",
    // "Correo":"oda@udla.edu.ec","Clave":"oda1234567890",
    // "Nivel":1,"Imagen":null,"Calificacions":null,
    // "Comentarios":null,"Favoritos":null,"RecetasTerminadas":null}

    // Ejecutar la consulta SQL de inserción
    const result = await request.query(query);

    console.log("Nuevo registro insertado:", result);
    return {status: true, content: data};
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return {status: false, content: error};
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const deleteUser = async (data) => {
  const { Correo, Clave } = data;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL para eliminar el registro
    const query = `DELETE FROM Usuarios WHERE Correo = @correo AND Clave = @clave`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("correo", sql.VarChar, Correo);
    request.input("clave", sql.VarChar, Clave);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);

    console.log("Registro eliminado:", result);
    return {status: true, content: result};
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return {status: false, content: error};
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const updateUser = async (data) => {
  const {
    CorreoAnterior,
    ClaveAnterior,
    NickName,
    Correo,
    Clave,
    Nivel,
    Imagen,
  } = data;
  let con;
  try {
    // Establecer conexión con la base de datos
    con = await getConnection();

    // Definir la consulta SQL para actualizar el registro
    const query = `UPDATE Usuarios SET NickName = @nickName, Correo = @correo, Clave = @clave, Nivel = @nivel, Imagen = @imagen WHERE Correo = @correoAnterior AND Clave = @claveAnterior`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request();

    // Asignar los valores a los parámetros de la consulta
    request.input("nickName", sql.VarChar, NickName);
    request.input("correo", sql.VarChar, Correo);
    request.input("clave", sql.VarChar, Clave);
    request.input("nivel", sql.Int, Nivel);
    request.input("imagen", sql.VarChar, Imagen);
    request.input("correoAnterior", sql.VarChar, CorreoAnterior);
    request.input("claveAnterior", sql.VarChar, ClaveAnterior);

    // Ejecutar la consulta SQL de actualización
    const result = await request.query(query);

    console.log("Registro actualizado:", result);
    return {status: true, content: result};
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return {status: false, content: error};
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getUser = async (data) => {
  const { Correo, Clave } = data;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL para obtener el usuario
    const query =
      "SELECT * FROM Usuarios WHERE Correo = @correo AND Clave = @clave";

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("correo", sql.VarChar, Correo);
    request.input("clave", sql.VarChar, Clave);

    // Ejecutar la consulta SQL de obtención del usuario
    const result = await request.query(query);
    console.log("result getUser: ", result);
    if (result.recordset.length > 0) {
      console.log("Usuario encontrado:", result.recordset[0]);
      return {status: true, content: result.recordset[0]};
    } else {
      console.log("Usuario no encontrado");
      return {status: false, content: "Usuario no encontrado"};
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return {status: false, content: error};
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getUserById = async (id) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL para obtener el usuario
    const query =
      "SELECT * FROM Usuarios WHERE UsuarioID = @usuarioid";

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("usuarioid", sql.Int, id);

    // Ejecutar la consulta SQL de obtención del usuario
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      console.log("Usuario encontrado:", result.recordset[0]);
      return {status: true, content: result.recordset[0]};
    } else {
      console.log("Usuario no encontrado");
      return {status: false, content: "Usuario no encontrado"};
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return {status: false, content: error};
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const makeComment = async (data) => {
  const { Contenido, RecetaID, UsuarioID } = data;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de inserción
    const query = `INSERT INTO Comentarios (Contenido, RecetaID, UsuarioID) VALUES (@contenido, @recetaID, @usuarioID)`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("contenido", sql.VarChar, Contenido);
    request.input("recetaID", sql.Int, RecetaID);
    request.input("usuarioID", sql.Int, UsuarioID);

    // Ejecutar la consulta SQL de inserción
    const result = await request.query(query);

    console.log("Nuevo comentario insertado:", result);
    return { status: true, content: data };
  } catch (error) {
    console.error("Error al insertar el comentario:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};


module.exports = { insertUser, deleteUser, updateUser, getUser, getUserById, makeComment };
