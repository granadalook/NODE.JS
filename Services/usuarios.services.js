class UsuariosServices {
  constructor() {}

  traer(limit, offset) {
    return {
      limit,
      offset,
    };
  }
}
module.exports = UsuariosServices;
