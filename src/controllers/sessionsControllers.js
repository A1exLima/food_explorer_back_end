const authConfig = require("../configs/auth")
const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

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
    const token = sign({role: user.role}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000
    })

    delete user.password

    response.json({user})
  }
}

module.exports = new SessionsControllers()
