const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const creacionProductoModel = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateProductoModel = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

const getProductoModel = Joi.object({
  id: id.required(),
});

module.exports = {
  creacionProductoModel,
  updateProductoModel,
  getProductoModel,
};
