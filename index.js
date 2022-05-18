const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./src/database/db-config");
// console.log(process.env)
const cors = require("cors");

const app = express();

//Database
connectToDatabase();

// CORS
app.use(cors());

//Routes
// app.get('/', (req, res) => {
//     return res.json({
//         ok: true,
//         response: "Success"
//     })
// })

// Public directory
// Middlewares
app.use(express.static("public"));
app.use(express.json()); // Request Body Processor

//Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/events", require("./src/routes/eventRoutes"));

//Listen requests

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running up in port: ${process.env.SERVER_PORT}`);
});
