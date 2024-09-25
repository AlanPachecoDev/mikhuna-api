const express = require("express");
const router = express.Router();
const { getAllByTable } = require("../database/generalMethods.js");
const {
  insertUser,
  deleteUser,
  updateUser,
  getUserById,
  makeComment,
} = require("../microservices/userService.js");

// Ruta para obtener todos los usuarios
router.get("", async (req, res) => {
  const response = await getAllByTable("Usuarios");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res
      .status(500)
      .json({ error: "Error al ejecutar la consulta get ", response: response.content });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  const response = await getUserById(userId);
  res.setHeader("Content-Type", "application/json");
  console.log("resposne getById: ", response);
  if (!response.status) {
    res.status(404).json({ response: response.content });
  } else {
    res.status(200).json(response);
  }
});

// Ruta para crear un nuevo usuario
router.post("", async (req, res) => {
  const userData = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await insertUser(userData);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res
      .status(500)
      .json({ error: "Error al ejecutar la consulta post", response: response.content });
  } else {
    res.status(200).json({ userData });
  }
});

router.delete("/delete", async (req, res) => {
  const data = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const resp = await deleteUser(data);
    if (!resp.status) {
      res.status(200).send(`User has been deleted.`);
    } else {
      res.status(500).json({ error: "Error deleting user", response: resp.content });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user", response: error });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const result = await updateUser(data);

    if (!result.status) {
      res.status(500).json({ message: "Error updating user", response: response.content });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user", response: error });
  }
});

router.post("/makeComment", async (req, res) => {
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await makeComment(data);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res
      .status(500)
      .json({ error: "Error al ejecutar la consulta post", response: response.content });
  } else {
    res.status(200).json({ data });
  }
});

// Exporta el objeto router
module.exports = router;
