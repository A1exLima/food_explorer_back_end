const { Router } = require("express")
const favoriteRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const favoriteControllers = require("../controllers/favoriteControllers")

favoriteRoutes.post("/:dish_id", ensureAuthenticated, verifyUserAuthorization(["customer"]), favoriteControllers.create)

favoriteRoutes.delete("/:dish_id", ensureAuthenticated, verifyUserAuthorization(["customer"]), favoriteControllers.delete)

favoriteRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), favoriteControllers.index)


module.exports = favoriteRoutes
