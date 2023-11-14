const { Router } = require("express")
const usersRoutes = Router()

const confirmPassword = require("../middlewares/confirmPassword")
const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userControllers = require("../controllers/usersControllers")

usersRoutes.post("/", verifyFieldsIfEmpty, confirmPassword, userControllers.create)
usersRoutes.get("/", ensureAuthenticated, userControllers.show)
usersRoutes.put("/", verifyFieldsIfEmpty, confirmPassword, ensureAuthenticated, userControllers.update)
usersRoutes.delete("/", ensureAuthenticated, userControllers.delete)

module.exports = usersRoutes
