const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const {hash} = require("bcryptjs")

class UserControllers {
  async create(request, response) {
    const {isAdmin, name, email, password } = request.body

    if(!name || !email || !password){
      throw new AppError("Preencha todos os campos")
    }

    const checkEmailExists = await knex("users").where({email}).first()

    if(checkEmailExists){
      throw new AppError("E-mail encontra-se em uso")
    }

    const hashPassword = await hash(password, 8)

    if(isAdmin){

      await knex("users").insert({
        isAdmin,
        name,
        email,
        password: hashPassword,
      })
    }else{

      await knex("users").insert({
        name,
        email,
        password: hashPassword,
      })
    }

    return response.json({
      message: "Usuário cadastrado com sucesso"
    })
  }
}

module.exports = new UserControllers()
