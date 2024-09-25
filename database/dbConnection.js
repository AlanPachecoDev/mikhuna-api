//Para bases de datos sql server
const sql = require("mssql");

//Connection string para base de datos en la nube
const config = {
  user: "AlanPacheco_SQLLogin_1",
  password: "br2vck1d1v",
  server: "MikhunaDB.mssql.somee.com",
  database: "MikhunaDB",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true, // Desactivar validación del certificado
  },
};

//Conecta una instancia de la base de datos
// const con = sql.connect(config, async (err) => {
//   if (err) {
//     console.error("Error al conectar con la base de datos:", err);
//   } else {
//     console.log("Conexión exitosa a la base de datos");
//   }
// });

let con = null; // Variable para almacenar la conexión

const getConnection = async () => {
  if (!con || !con.connected) {
    try {
      con = await sql.connect(config);
      console.log("Conexión exitosa a la base de datos");
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error; // Lanzar el error para manejarlo en la llamada
    }
  }
  return con;
};



module.exports = { getConnection, sql };
