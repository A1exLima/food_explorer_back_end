const knex = require("../dataBase/knex")

class DishControllers {
  async create(request, response) {
    const user_id = request.user.id
    const {name, category, ingredients, price, description, image } = request.body

    const [dish_id] = await knex("dish").insert({
      name,
      category,
      price,
      description,
      image,
      user_id
    })

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        user_id,
        dish_id,
        name: ingredient
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json({
      status: response.statusCode,
      message: "Prato cadastrado com sucesso"
    })
  }

}

module.exports = new DishControllers()
