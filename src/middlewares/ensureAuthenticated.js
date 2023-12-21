const AppError = require("../utils/appError")
const { verify } = require("jsonwebtoken")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT - Token não informado")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
      role
    }
    
    return next()
  } catch {
    throw new AppError("JWT - Token inválido")
  }
}

module.exports = ensureAuthenticated
