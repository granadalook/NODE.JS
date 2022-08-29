const express = require("express");
const ProductosService = require("../../Services/producto.services");
const validatorHandler = require("../../middlewares/validator.handler");
const {
  creacionProductoModel,
  updateProductoModel,
  getProductoModel,
} = require("../../models/productos.models");

const router = express.Router();

const service = new ProductosService();
router.get("/", async (req, res) => {
  const product = await service.buscar();
  res.status(200).json(product);
});

router.get("/size/", (req, res) => {
  const product = service.buscar();
  res.status(200).json(product);
});

//metodo get
router.get(
  "/:id",
  validatorHandler(getProductoModel, "params"),
  async (req, res, next) => {
    try {
      //con los dos puntos recibimos in parametro de entrada
      const { id } = req.params; // de esta manera   manejamos en parametro que nos entro
      const product = await service.buscarId(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// metodo post
router.post(
  "/",

  async (req, res) => {
    const body = req.body;
    const product = await service.crear(body);
    res.status(201).json(product);
  }
);

// metodo post
router.post(
  "/create",
  validatorHandler(creacionProductoModel, "body"),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);
  }
);

// metodo pach
router.patch(
  "/:id",
  validatorHandler(getProductoModel, "params"),
  validatorHandler(updateProductoModel, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// metodo delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.status(200).json(product);
});
module.exports = router;
