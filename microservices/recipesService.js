const { getConnection, sql } = require("../database/dbConnection.js");

const addRecipe = async (data) => {
  const { Nombre, Duracion, UrlImagen } = data;
  let CalificacionPromedio = 1;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de inserción
    const query = `INSERT INTO Recetas (Nombre, Duracion, UrlImagen, CalificacionPromedio) VALUES (@nombre, @duracion, @urlImagen, @calificacionPromedio)`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("nombre", sql.VarChar, Nombre);
    request.input("duracion", sql.Real, Duracion);
    request.input("urlImagen", sql.VarChar, UrlImagen);
    request.input("calificacionPromedio", sql.Real, CalificacionPromedio);

    // Ejecutar la consulta SQL de inserción
    const result = await request.query(query);

    console.log("Nuevo registro insertado:", result);
    return { status: true, content: data };
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const addIngredient = async (data) => {
  const { Nombre, Unidad, RecetaID } = data;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de inserción
    const query = `INSERT INTO Ingredientes (Nombre, Unidad, RecetaID) VALUES (@nombre, @unidad, @recetaID)`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("nombre", sql.VarChar, Nombre);
    request.input("unidad", sql.VarChar, Unidad);
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de inserción
    const result = await request.query(query);

    console.log("Nuevo registro insertado:", result);
    return { status: true, content: data };
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const addStep = async (data) => {
  const { Paso, RecetaID } = data;
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de inserción
    const query = `INSERT INTO Pasos (Paso, RecetaID) VALUES (@paso, @recetaID)`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar los valores a los parámetros de la consulta
    request.input("Paso", sql.VarChar, Paso);
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de inserción
    const result = await request.query(query);

    console.log("Nuevo registro insertado:", result);
    return { status: true, content: data };
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getIngredientsByRecetaID = async (recetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de selección
    const query = `SELECT * FROM Ingredientes WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, recetaID);

    // Ejecutar la consulta SQL de selección
    const result = await request.query(query);

    // Verificar si se encontraron ingredientes con el RecetaID proporcionado
    if (result.recordset.length > 0) {
      const ingredientes = result.recordset;
      console.log("Ingredientes encontrados:", ingredientes);
      return { status: true, content: ingredientes };
    } else {
      console.log(
        "No se encontraron ingredientes con el RecetaID proporcionado"
      );
      return {
        status: false,
        content: "No se encontraron ingredientes con el RecetaID proporcionado",
      };
    }
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getStepsByRecetaID = async (recetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de selección
    const query = `SELECT * FROM Pasos WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, recetaID);

    // Ejecutar la consulta SQL de selección
    const result = await request.query(query);

    // Verificar si se encontraron pasos con el RecetaID proporcionado
    if (result.recordset.length > 0) {
      const pasos = result.recordset;
      console.log("Pasos encontrados:", pasos);
      return { status: true, content: pasos };
    } else {
      console.log("No se encontraron pasos con el RecetaID proporcionado");
      return {
        status: false,
        content: "No se encontraron pasos con el RecetaID proporcionado",
      };
    }
  } catch (error) {
    console.error("Error al obtener los pasos:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getCommentsByRecetaID = async (recetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de selección
    const query = `SELECT * FROM Comentarios WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, recetaID);

    // Ejecutar la consulta SQL de selección
    const result = await request.query(query);

    // Verificar si se encontraron comentarios con el RecetaID proporcionado
    if (result.recordset.length > 0) {
      const comentarios = result.recordset;
      console.log("Comentarios encontrados:", comentarios);
      return { status: true, content: comentarios };
    } else {
      console.log(
        "No se encontraron comentarios con el RecetaID proporcionado"
      );
      return {
        status: false,
        content: "No se encontraron comentarios con el RecetaID proporcionado",
      };
    }
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const getRecipeById = async (recetaId) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de selección
    const query = `SELECT * FROM Recetas WHERE RecetaID = @recetaId`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaId", sql.Int, recetaId);

    // Ejecutar la consulta SQL de selección
    const result = await request.query(query);
    // Verificar si se encontró una receta con el RecetaID proporcionado
    if (result.recordset.length > 0) {
      const recipe = result.recordset[0];
      console.log("Receta encontrada:", recipe);

      //En este punto ya hemos encontrado la receta, ahora debemos recuperar los
      //Pasos, ingredientes y comentarios asociados a esa receta y ponerlos dentro de un atributo
      //Dentro del objeto que se va a retornar

      //Recuperamos los ingredientes
      let ingredientes = await getIngredientsByRecetaID(recetaId);

      if (!ingredientes.status) {
        ingredientes = [];
      } else {
        ingredientes = ingredientes.content;
      }

      //Recuperamos los pasos
      let pasos = await getStepsByRecetaID(recetaId);

      if (!pasos.status) {
        pasos = [];
      } else {
        pasos = pasos.content;
      }

      //Recuperamos los comentarios
      let comentarios = await getCommentsByRecetaID(recetaId);

      if (!comentarios.status) {
        comentarios = [];
      } else {
        comentarios = comentarios.content;
      }

      recipe["Comentarios"] = comentarios;
      recipe["Pasos"] = pasos;
      recipe["Ingredientes"] = ingredientes;
      console.log("recipe a enviar: ", recipe);

      return { status: true, content: recipe };
    } else {
      console.log(
        "No se encontró ninguna receta con el RecetaID proporcionado"
      );
      return { status: false, content: "Receta no encontrada" };
    }
  } catch (error) {
    console.error("Error al obtener la receta:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const deleteCalificacionsByRecetaID = async (RecetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de eliminación
    const query = `DELETE FROM Calificacions WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);

    console.log("Registros eliminados:", result.rowsAffected);
    return {
      status: true,
      content: `Se han eliminado ${result.rowsAffected} calificaciones`,
    };
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const deleteCommentsByRecetaID = async (RecetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de eliminación
    const query = `DELETE FROM Comentarios WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);

    console.log("Registros eliminados:", result.rowsAffected);
    return {
      status: true,
      content: `Se han eliminado ${result.rowsAffected} comentarios`,
    };
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};


const deleteIngredientsByRecetaID = async (RecetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de eliminación
    const query = `DELETE FROM Ingredientes WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);

    console.log("Registros eliminados:", result.rowsAffected);
    return {
      status: true,
      content: `Se han eliminado ${result.rowsAffected} comentarios`,
    };
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const deleteStepsByRecetaID = async (RecetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de eliminación
    const query = `DELETE FROM Pasos WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);

    console.log("Registros eliminados:", result.rowsAffected);
    return {
      status: true,
      content: `Se han eliminado ${result.rowsAffected} comentarios`,
    };
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};

const deleteRecipeByID = async (RecetaID) => {
  let con;
  try {
    con = await getConnection();
    // Definir la consulta SQL de eliminación
    const query = `DELETE FROM Recetas WHERE RecetaID = @recetaID`;

    // Crear un objeto de solicitud de la consulta
    const request = new sql.Request(con);

    // Asignar el valor al parámetro de la consulta
    request.input("recetaID", sql.Int, RecetaID);

    // Ejecutar la consulta SQL de eliminación
    const result = await request.query(query);
    console.log("Registros eliminados:", result.rowsAffected);
    return {
      status: true,
      content: `Se han eliminado ${result.rowsAffected} comentarios`,
    };
  } catch (error) {
    console.error("Error al eliminar los registros:", error);
    return { status: false, content: error };
  } finally {
    // Cerrar la conexión a la base de datos
    await con.close();
  }
};
module.exports = { addRecipe, addIngredient, addStep, getRecipeById, deleteCalificacionsByRecetaID, deleteCommentsByRecetaID, deleteIngredientsByRecetaID, deleteStepsByRecetaID, deleteRecipeByID };
