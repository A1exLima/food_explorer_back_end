const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const { hash, compare } = require("bcryptjs")

class UserControllers {
  async index(request, response) {
    const { user_id } = request.params

    const user = await knex("users").where({ id: user_id }).first()

    delete user.password

    response.json(user)
  }

  async show(request, response) {
    const user_id = request.user.id
    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    delete user.password
    
    response.json(user)
  }

  async create(request, response) {
    const { name, email, password } = request.body

    const checkEmailExists = await knex("users").where({ email }).first()

    if (checkEmailExists) {
      throw new AppError("E-mail encontra-se em uso")
    }

    const hashPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
    })

    return response.json({
      message: "Usuário cadastrado com sucesso",
    })
  }

  async update(request, response) {
    const user_id = request.user.id
    const { name, email, oldPassword, newPassword } = request.body

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const emailIsInUse = await knex("users").where({ email }).first()

    if (emailIsInUse && emailIsInUse.id !== user.id) {
      throw new AppError("Email encontra-se em uso")
    }

    if (oldPassword === false && newPassword === false) {
      user.name = name ?? user.name
      user.email = email ?? user.email

      await knex("users")
        .update({
          name: user.name,
          email: user.email,
          updated_at: knex.raw(
            "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
          ),
        })
        .where({ id: user_id })
    } else {
      const checkOldPassword = await compare(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new AppError("Senha antiga não confere")
      }

      const password = await hash(newPassword, 8)

      user.name = name ?? user.name
      user.email = email ?? user.email
      user.password = password ?? user.password

      await knex("users")
        .update({
          name: user.name,
          email: user.email,
          password: user.password,
          updated_at: knex.raw(
            "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
          ),
        })
        .where({ id: user_id })
    }

    delete user.password

    return response.json(user)
  }

  async delete(request, response) {
    const user_id = request.user.id

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    await knex("users").where({ id: user_id }).delete()

    return response.json({
      message: "Usuário deletado com sucesso",
    })
  }
}

module.exports = new UserControllers()
