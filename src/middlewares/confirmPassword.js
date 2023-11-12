const AppError = require("../utils/appError")

function confirmPassword(request, response, next) {
  const { password, confirmPassword} = request.body

  if(password !== confirmPassword){
    throw new AppError("Senha de confirmação incorreta")
  }

  next()
}

module.exports = confirmPassword