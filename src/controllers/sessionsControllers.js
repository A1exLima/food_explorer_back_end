const AppError = require("../utils/appError")

const knex = require("../dataBase/knex")

const { compare } = require("bcryptjs")

const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsControllers {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta")
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError("E-mail e/ou senha incorreta")
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.json({user, token})
  }
}

module.exports = new SessionsControllers()
