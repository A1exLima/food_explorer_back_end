const { Router } = require("express")
const usersRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const upload = multer(uploadConfig.MULTER)

const confirmPassword = require("../middlewares/confirmPassword")
const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userControllers = require("../controllers/usersControllers")
const avatarControllers = require("../controllers/avatarControllers")

usersRoutes.post("/", verifyFieldsIfEmpty, confirmPassword, userControllers.create)
usersRoutes.get("/", ensureAuthenticated, userControllers.show)
usersRoutes.put("/", ensureAuthenticated, userControllers.update)
usersRoutes.delete("/", ensureAuthenticated, userControllers.delete)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), avatarControllers.update)


module.exports = usersRoutes
