const { Router } = require("express")
const usersRoutes = Router()

const confirmPassword = require("../middlewares/confirmPassword")
const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")

const userControllers = require("../controllers/usersControllers")

usersRoutes.get("/:id", userControllers.show)
usersRoutes.post("/", verifyFieldsIfEmpty, confirmPassword, userControllers.create)

module.exports = usersRoutes
