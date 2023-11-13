const { Router } = require("express")
const usersRoutes = Router()

const confirmPassword = require("../middlewares/confirmPassword")
const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")

const userControllers = require("../controllers/usersControllers")

usersRoutes.get("/:id", userControllers.show)
usersRoutes.post("/", verifyFieldsIfEmpty, confirmPassword, userControllers.create)
usersRoutes.put("/:id", verifyFieldsIfEmpty, confirmPassword, userControllers.update)
usersRoutes.delete("/:id", userControllers.delete)

module.exports = usersRoutes
