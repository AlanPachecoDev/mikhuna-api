const express = require("express");
const router = express.Router();
const { getAllByTable } = require("../database/generalMethods");
const {
  addRecipe,
  addIngredient,
  addStep,
  getRecipeById,
  deleteCalificacionsByRecetaID,
  deleteCommentsByRecetaID,
  deleteIngredientsByRecetaID,
  deleteRecipeByID
} = require("../microservices/recipesService.js");

router.get("", async (req, res) => {
  const response = await getAllByTable("Recetas");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta get ",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

router.get("/calificacions", async (req, res) => {
  const response = await getAllByTable("Calificacions");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta get ",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

router.get("/comments", async (req, res) => {
  const response = await getAllByTable("Comentarios");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta get ",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

router.get("/ingredients", async (req, res) => {
  const response = await getAllByTable("Ingredientes");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta get ",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

router.get("/steps", async (req, res) => {
  const response = await getAllByTable("Pasos");
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta get ",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content.recordset);
  }
});

// Ruta para crear un nuevo usuario
router.post("", async (req, res) => {
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await addRecipe(data);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta post",
      response: response.content,
    });
  } else {
    res.status(200).json({ data });
  }
});

router.post("/ingredients", async (req, res) => {
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await addIngredient(data);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta post",
      response: response.content,
    });
  } else {
    res.status(200).json({ data });
  }
});

router.post("/steps", async (req, res) => {
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await addStep(data);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res.status(500).json({
      error: "Error al ejecutar la consulta post",
      response: response.content,
    });
  } else {
    res.status(200).json({ data });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getRecipeById(id);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});

router.delete("/deleteCalificacion/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteCalificacionsByRecetaID(id);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});

router.delete("/deleteComment/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteCommentsByRecetaID(id);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});

router.delete("/ingredients/deleteIngredient/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteIngredientsByRecetaID(id);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});

router.delete("/steps/deleteStep/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteStepsByRecetaID(id);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete recipe by id: ", id);
  const response = await deleteRecipeByID(id);
  
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {

    res.status(500).json({
      error: "Error al ejecutar la consulta get de receta por id",
      response: response.content,
    });
  } else {
    res.status(200).json(response.content);
  }
});
// Exporta el objeto router
module.exports = router;
