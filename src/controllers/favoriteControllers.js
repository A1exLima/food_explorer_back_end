const knex = require("../dataBase/knex")
const AppError = require("../utils/appError")

class FavoriteControllers {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const [id] = await knex("favoriteDishes").insert({
      dish_id,
      user_id,
    })

    if (!id) {
      throw new AppError("Não foi possível favoritar o prato", 401)
    }

    return response.json({
      message: "Prato favoritado com sucesso",
    })
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const usersFavoriteDishes = await knex("favoriteDishes").where({ user_id })

    let dishIdFavorites

    for (let i = 0; i < usersFavoriteDishes.length; i++) {
      if (usersFavoriteDishes[i].dish_id == dish_id) {
        dishIdFavorites = usersFavoriteDishes[i].id
      }
    }

    if (dishIdFavorites) {
      await knex("favoriteDishes").where({ id: dishIdFavorites }).delete()
    } else {
      throw new AppError("Não foi possível localizar o prato favorito")
    }

    return response.json({ message: "Prato favorito deletado com sucesso" })
  }

  async index(request, response) {
    const user_id = request.user.id

    const usersFavoriteDishes = await knex("favoriteDishes").where({ user_id })

    if (usersFavoriteDishes) {
      return response.json(usersFavoriteDishes)
    } else {
      throw new AppError("Não foi possível localizar os pratos favoritos")
    }
  }
}

module.exports = new FavoriteControllers()
