const { Router } = require("express")
const usersValidatedRoutes = Router()

const usersValidatedControllers = require("../controllers/usersValidatedControllers")

usersValidatedRoutes.post("/", usersValidatedControllers.index)

module.exports = usersValidatedRoutes
