const {Router} = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")
routes.use("/users", usersRoutes)

const sessionsRoutes = require("./sessions.routes")
routes.use("/sessions", sessionsRoutes)

const searchCepRoutes = require("./searchCep.routes")
routes.use("/search_cep", searchCepRoutes)

const addressRoutes = require("./address.routes")
routes.use("/address", addressRoutes)

const dishRoutes = require("./dish.Routes")
routes.use("/dish", dishRoutes)

module.exports = routes