const express = require("express");
const router = express.Router();

const { registerUser, login, editUser } = require("../microservices/authService");

//Ruta para obtener todos los usuarios
router.post("/login", async (req, res) => {
  const data = req.body;
  const response = await login(data);
  res.setHeader("Content-Type", "application/json");
  if (!response.status) {
    res.status(500).json({ error: "Error al ejecutar la consulta get: ", response: response.content });
  } else {
    res.status(200).json(response);
  }
});

// Ruta para crear un nuevo usuario
router.post("/register", async (req, res) => {
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await registerUser(data);
  console.log("response register: ", response);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res.status(500).json({ error: "Error al hacer register ", response: response.content });
  } else {
    res.status(200).json({ data });
  }
});

router.put("/edit/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body; // Acceder correctamente al cuerpo de la solicitud

  const response = await editUser(userId, data);
  console.log("response edit user: ", response);
  res.setHeader("Content-Type", "application/json");
  // Lógica para crear un nuevo usuario
  if (!response.status) {
    res.status(500).json({ error: "Error al hacer register ", response: response.content });
  } else {
    res.status(200).json({ data });
  }
});

// router.delete("/delete", async (req, res) => {
//   const data = req.body;
//   try {
//     const resp = await deleteUser(data);
//     if (resp) {
//       res.status(200).send(`User has been deleted.`);
//     } else {
//       res.status(500).json({ message: "Error deleting user" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting user" });
//   }
// });

// router.put("/update", async (req, res) => {
//   const data = req.body;
//   try {
//     const result = await updateUser(data);

//     if (!result) {
//       res.status(500).json({ message: "Error updating user" });
//     } else {
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating user" });
//   }
// });

// Exporta el objeto router
module.exports = router;
