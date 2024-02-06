const knex = require("../dataBase/knex")

class UsersValidatedControllers {
  async index(request, response) {
    const user = request.body
    let routeAuthorization

    if (Object.keys(user).length === 0) {
      routeAuthorization = false
    } else {
      const verifiedUser = await knex("users").where({ id: user.id }).first()

      if (user.role === verifiedUser.role) {
        routeAuthorization = true
      } else {
        routeAuthorization = false
      }
    }

    response.json(routeAuthorization)
  }
}

module.exports = new UsersValidatedControllers()
