/* const boom = require("@hapi/boom");

function validatorHandler(modelo, propiedad) {
  return (req, res, next) => {
    const data = req[propiedad];
    const { error } = modelo.validate(data);

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = { validatorHandler }; */
const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
