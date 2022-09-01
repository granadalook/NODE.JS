const express = require("express");

const UserService = require("../../Services/usuarios.services");
const validatorHandler = require("../../middlewares/validator.handler");
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require("../../models/usuarios.models");

const router = express.Router();
const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      //const idI = parseInt(id);
      const user = await service.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.updateId(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
