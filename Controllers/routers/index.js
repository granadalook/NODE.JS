const express = require("express");

const usuariosRouter = require("./usuarios.router");
const productsRouter = require("./products.router");
const categoriasRouter = require("./categorias.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router); //  forma de   hacer un endpoint  global
  router.use("/productos/", productsRouter);
  router.use("/usuarios/", usuariosRouter);
  router.use("/categorias/", categoriasRouter);
}

module.exports = routerApi;
