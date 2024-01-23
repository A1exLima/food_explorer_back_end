const { Router } = require("express")
const checkoutRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const checkoutControllers = require("../controllers/checkoutControllers")

checkoutRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["customer"]), checkoutControllers.create)
checkoutRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), checkoutControllers.index)
checkoutRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["customer", "admin"]), checkoutControllers.show)
checkoutRoutes.patch("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), checkoutControllers.update)


module.exports = checkoutRoutes
