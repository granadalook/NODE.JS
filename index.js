const express = require("express");
const routerApi = require("./Controllers/routers/index");
const cors = require("cors");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");
const app = express();
const port = process.env.PORT || 3000;
const whitelist = [
  "http://localhost:3000/api-docs/#/Users/post_create",
  "https://myapp.co",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CONEXION NO PERMITIDA "));
    }
  },
};

app.use(cors());
app.use(express.json()); // midewer para recibir parametros por peticion post
/* 
app.get("/", (req, res) => {
  res.send("Mi puerto con express");
});

app.get("/nueva", (req, res) => {
  res.send("ruta nueva");
}); */
const swaggerUi = require("swagger-ui-express"),
  swaggerDocumento = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumento));

routerApi(app);
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);
app.listen(port, () => {
  console.log("mi puerto es el " + port);
});
