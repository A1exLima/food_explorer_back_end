const { Router } = require("express")
const checkoutRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const checkoutControllers = require("../controllers/checkoutControllers")

checkoutRoutes.post("/", ensureAuthenticated, checkoutControllers.create)

module.exports = checkoutRoutes
