const { Router } = require("express")
const addressRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const addressControllers = require("../controllers/addressControllers")

addressRoutes.post("/", ensureAuthenticated, addressControllers.create)
addressRoutes.put("/", ensureAuthenticated, addressControllers.update)
addressRoutes.get("/", ensureAuthenticated, addressControllers.show)
addressRoutes.get("/:user_id", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), addressControllers.index)

module.exports = addressRoutes
