const AppError = require("../utils/appError")

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}

module.exports = verifyUserAuthorization
