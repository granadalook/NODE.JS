const faker = require("faker");
const boom = require("@hapi/boom");

class ProductosService {
  constructor() {
    this.productos = [];
    this.generar();
  }
  generar() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.productos.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }

    return this, this.productos;
  }
  crear(body) {
    return {
      ///  de esta menera  se modifica los estados de  la peticion http
      message: "CREADO",
      data: body,
    };
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.productos.push(newProduct);
    return newProduct;
  }
  buscar() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos);
      }, 1000);
    });
  }
  buscarId(id) {
    const product = this.productos.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound("PRODUCTO NO EXISTE");
    } else if (product.isBlock === true) {
      throw boom.conflict("PRODUCTO BLOQUEADO");
    } else {
      return product;
    }
  }

  async update(id, changes) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("PRODUCTO NO EXISTE");
    }
    const product = this.productos[index];
    this.productos[index] = {
      ...product,
      ...changes,
    };
    return this.productos[index];
  }

  actualizar(id, body) {
    return {
      message: "ACTUALIZADO",
      data: body,
      id,
    };
  }

  async delete(id) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("PRODUCTO NO EXISTE");
    }
    this.productos.splice(index, 1);
    return { id, message: "ELIMINADO" };
  }

  eliminar(id) {
    if (id === "3") {
      return {
        message: "IMPOSIBLE ELIMINAR",
        id,
        status: 404,
      };
    } else {
      return {
        message: "ELIMINADO",
        id,
        status: 200,
      };
    }
  }
}
module.exports = ProductosService;
