const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const { hash } = require("bcryptjs")

class UserControllers {
  async show(request, response) {
    const {id} = request.params

    const user = await knex("users").where({ id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    response.json(user)
  }

  async create(request, response) {
    const {isAdmin, name, email, password } = request.body

    const checkEmailExists = await knex("users").where({ email }).first()

    if (checkEmailExists) {
      throw new AppError("E-mail encontra-se em uso")
    }

    const hashPassword = await hash(password, 8)

    await knex("users").insert({
      isAdmin,
      name,
      email,
      password: hashPassword,
    })

    return response.json({
      message: "Usuário cadastrado com sucesso",
    })
  }
}

module.exports = new UserControllers()
