const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")

class AddressController {
  async create(request, response) {
    const user_id = request.user.id
    const address = request.body

    const oldAddress = await knex("address").where({ user_id }).first()

    if (oldAddress) {
      throw new AppError("Usuário já possui um endereço cadastrado", 401)
    }

    await knex("address").insert({
      user_id,
      ...address,
    })

    return response.json({
      message: "Endereço cadastrado com sucesso",
    })
  }

  async update(request, response) {
    const user_id = request.user.id
    const address = request.body
    const oldAddress = await knex("address").where({ user_id }).first()

    if (!oldAddress) {
      throw new AppError("Endereço não encontrado", 404)
    }

    await knex("address")
      .update({
        updated_at: knex.raw(
          "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
        ),
        ...address,
      })
      .where({ user_id })

    return response.json({
      message: "Endereço atualizado com sucesso",
    })
  }

  async show(request, response) {
    const user_id = request.user.id
    const address = await knex("address").where({ user_id }).first()

    if (!address) {
      throw new AppError("Endereço não encontrado", 404)
    }
    response.json({
      street: address.street,
      number: address.number,
      cep: address.cep,
      complement: address.complement,
      district: address.district,
      city: address.city,
      country: address.country,
    })
  }

  async index(request, response) {
    const {user_id} = request.params

    const address = await knex("address").where({ user_id }).first()

    if (!address) {
      throw new AppError("Endereço não encontrado", 404)
    }
    
    response.json({
      street: address.street,
      number: address.number,
      cep: address.cep,
      complement: address.complement,
      district: address.district,
      city: address.city,
      country: address.country,
    })
  }
}

module.exports = new AddressController()
