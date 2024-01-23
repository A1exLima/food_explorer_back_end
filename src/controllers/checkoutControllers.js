const knex = require("../dataBase/knex")
const AppError = require("../utils/appError")

class CheckoutControllers {
  async create(request, response) {
    const user_id = request.user.id
    const {
      paymentType,
      payment,
      deliveryType,
      orderCompleted,
      numberInstallments,
      cartItems,
    } = request.body

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
        count: item.count,
      }
    })

    await knex("orderItems").insert(orderItemsInsert)

    response.json({
      message: `Pedido número ${order_id} criado com sucesso`,
    })
  }

  async index(request, response) {
    const { role, id } = request.user

    if (role === "customer") {
      const orders = await knex("orders").where({ user_id: id }).orderBy("id")
      const itemsOrder = await knex("orderItems").where({ user_id: id })

      const ordersWithItemsOrder = orders.map((order) => {
        const orderItems = itemsOrder.filter(
          (item) => item.order_id === order.id
        )
        return {
          ...order,
          itemsOrder: orderItems,
        }
      })

      if (ordersWithItemsOrder.length === 0) {
        throw new AppError("Não foi possível localizar os pedidos.")
      }

      return response.json(ordersWithItemsOrder)
    } else if (role === "admin") {
      const orders = await knex("orders").orderBy("id")
      const itemsOrder = await knex("orderItems")

      const ordersWithItemsOrder = orders.map((order) => {
        const orderItems = itemsOrder.filter(
          (item) => item.order_id === order.id
        )
        return {
          ...order,
          itemsOrder: orderItems,
        }
      })

      if (ordersWithItemsOrder.length === 0) {
        throw new AppError("Não foi possível localizar os pedidos.")
      }

      return response.json(ordersWithItemsOrder)
    }
  }

  async show(request, response) {
    const { id } = request.params

    const order = await knex("orders").where({ id })
    const itemsOrder = await knex("orderItems").where({ order_id: id })

    if (order.length <= 0) {
      throw new AppError("Pedido não encontrado", 401)
    }

    const orderAndItemsOrder = {
      order,
      itemsOrder
    }

    return response.json(orderAndItemsOrder)
  }

  async update(request, response) {
    const {id, status} = request.query

    await knex("orders").update({
      orderCompleted: status
    }).where({id})

    const confirmUpdate = await knex("orders").where({id}).first()

    response.json(confirmUpdate)
  }
}

module.exports = new CheckoutControllers()
