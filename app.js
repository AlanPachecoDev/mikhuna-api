const express = require("express");
const bodyParser = require("body-parser");

// Rutas
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const recipesRoutes = require("./routes/recipesRoutes.js");
// Aplicación que corre express
const app = express();

// Configuración de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Le decimos a la app que use las rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);



// Puerto en el que se ejecutará el servidor
const port = 3000;
// Inicia el servidor
app.listen(port, () => {
  console.log(
    `Servidor Express ejecutándose en el puerto http://localhost:${port}`
  );
});
