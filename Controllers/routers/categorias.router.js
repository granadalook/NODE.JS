const express = require("express");
const CategoriaServices = require("../../Services/categorias.services");
const service = new CategoriaServices();
const router = express.Router();
router.get("/:categoriasId/productos/:productosId", (req, res) => {
  // forma pra recibir 2 parametros en el mismo get
  const { categoriasId, productosId } = req.params; // esta es la mejor convencion
  const product = service.traer(categoriasId, productosId);
  res.json(product);
});

module.exports = router;
