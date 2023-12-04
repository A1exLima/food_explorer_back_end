const { Router } = require("express")
const dishRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishControllers = require("../controllers/dishControllers")

dishRoutes.post("/", ensureAuthenticated, dishControllers.create)

module.exports = dishRoutes
