const express = require("express");
const UsuariosServices = require("../../Services/usuarios.services");
const router = express.Router();
const service = new UsuariosServices();
router.get("/", (req, res) => {
  //  forma de usar query en los endponins http://localhost:3000/usuarios?limit=10&offset=200
  const { limit, offset } = req.query;
  const product = service.traer(limit, offset);
  if (limit && offset) {
    res.json(product);
  } else {
    res.send("no hay querys");
  }
});

module.exports = router;
