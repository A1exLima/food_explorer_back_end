const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const { hash, compare } = require("bcryptjs")

class UserControllers {
  async show(request, response) {
    const user_id = request.user.id
    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    response.json(user)
  }

  async create(request, response) {
    const { isAdmin, name, email, password } = request.body
  
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

  async update(request, response) {
    const user_id = request.user.id
    const { isAdmin, name, email, oldPassword, password } = request.body

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const emailIsInUse = await knex("users").where({ email }).first()

    if (emailIsInUse && emailIsInUse.id !== user.id) {
      throw new AppError("E-mail encontra-se em uso")
    }

    const checkOldPassword = await compare(oldPassword, user.password)

    if (!checkOldPassword) {
      throw new AppError("Senha antiga não confere")
    }

    const newPassword = await hash(password, 8)

    await knex("users")
      .update({
        isAdmin,
        name,
        email,
        password: newPassword,
        updated_at: knex.raw(
          "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
        ),
      })
      .where({ id: user_id })

    return response.json({
      message: "Usuário atualizado com sucesso",
    })
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
