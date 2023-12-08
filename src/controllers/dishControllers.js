const knex = require("../dataBase/knex")
const AppError = require("../utils/appError")

class DishControllers {
  async create(request, response) {
    const user_id = request.user.id
    const { name, category, ingredients, price, description, image } =
      request.body

    if (ingredients.length === 0) {
      throw new AppError("Insira os ingredientes")
    }

    const [dish_id] = await knex("dish").insert({
      name,
      category,
      price,
      description,
      image,
      user_id,
    })

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        user_id,
        dish_id,
        name: ingredient,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json({
      message: "Prato cadastrado com sucesso",
      dish_id,
    })
  }

  async index(request, response) {
    const user_id = request.user.id
    const { name, category } = request.query

    const filterCategory = category
      .split(",")
      .map((category) => category.trim())

    let dishes

    if (category) {
      dishes = await knex("dish")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .whereIn("category", filterCategory)
        .orderBy("name")
    } else {
      dishes = await knex("dish")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
    }

    response.json(dishes)
  }
}

module.exports = new DishControllers()
