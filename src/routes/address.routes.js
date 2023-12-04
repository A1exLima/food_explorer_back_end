const { Router } = require("express")
const addressRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const addressControllers = require("../controllers/addressControllers")

addressRoutes.post("/", ensureAuthenticated, addressControllers.create)
addressRoutes.put("/", ensureAuthenticated, addressControllers.update)
addressRoutes.get("/", ensureAuthenticated, addressControllers.show)

module.exports = addressRoutes
