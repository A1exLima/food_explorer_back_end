const { Router } = require("express")
const usersRoutes = Router()

const confirmPassword = require("../middlewares/confirmPassword")
const userControllers = require("../controllers/usersControllers") 

usersRoutes.post("/", confirmPassword, userControllers.create)

module.exports = usersRoutes
