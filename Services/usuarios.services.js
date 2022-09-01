const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
class UsuariosServices {
  constructor() {}
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findById(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound("USUARIO NO ENCONTRADO");
    }
    return user;
  }

  async updateId(id, changes) {
    const user = await this.findById(id);
    const rta = await user.update(changes);
    return {
      rta,
    };
  }

  async delete(id) {
    const user = await this.findById(id);
    await models.User.destroy({ where: { id } });
    return user
  }
}

module.exports = UsuariosServices;
