const AppError = require("../utils/appError")

function verifyFieldsIfEmpty(request, response, next) {

  const object = request.body

  for (let key in object) {

    if (object.hasOwnProperty(key)) {

      if (!object[key]) {
        throw new AppError("Preencha todos os campos", 401)
      }
    }
  }
  
  return next()
}

module.exports = verifyFieldsIfEmpty
