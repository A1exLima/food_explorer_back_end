const knex = require("../dataBase/knex")
const AppError = require("../utils/appError")

class CheckoutControllers {
  async create(request, response) {
    const user_id = request.user.id
    const { paymentType, payment, deliveryType, orderCompleted, numberInstallments, cartItems } = request.body

    const [order_id] = await knex("orders").insert({
      user_id,
      paymentType,
      payment,
      deliveryType,
      orderCompleted,
      numberInstallments,
    })

    const orderItemsInsert = cartItems.map((item) => {
      return {
        order_id,
        user_id,
        dish_id: item.id,
        count: item.count
      }
    })

    await knex("orderItems").insert(orderItemsInsert)

    response.json({
      message: `Pedido número ${order_id} criado com sucesso`,
    })

  }

}

module.exports = new CheckoutControllers()
