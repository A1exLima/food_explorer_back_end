const fetch = require("node-fetch")
const AppError = require("../utils/appError")

class SearchCepControllers {
  async show(request, response) {
    const { cep } = request.body

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        
        if (data.erro) {
          throw new AppError("Cep não localizado", 404)
        }
        const address = data

        return response.json({
          street: address.logradouro,
          district: address.bairro,
          city: address.localidade,
          country: address.uf,
          cep: address.cep,
        })
      })
      .catch((error) => {
        throw new AppError(error.message)
      })
  }
}

module.exports = new SearchCepControllers()
