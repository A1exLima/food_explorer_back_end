const knex = require("../dataBase/knex")
const AppError = require("../utils/appError")

class DishControllers {
  async create(request, response) {
    const user_id = request.user.id
    const { name, category, ingredients, price, description, image } = request.body

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
      dish_id
    })
  }
}

module.exports = new DishControllers()
