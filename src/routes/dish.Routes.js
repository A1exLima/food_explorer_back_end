const { Router } = require("express")
const dishRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const upload = multer(uploadConfig.MULTER_DISH)

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")

const dishControllers = require("../controllers/dishControllers")
const imageDishControllers = require("../controllers/imageDishControllers")

dishRoutes.get("/", ensureAuthenticated, dishControllers.index)
dishRoutes.get("/:id", ensureAuthenticated, dishControllers.show)
dishRoutes.post("/", verifyFieldsIfEmpty, ensureAuthenticated, dishControllers.create)
dishRoutes.put("/:id", ensureAuthenticated, dishControllers.update)
dishRoutes.delete("/:id", ensureAuthenticated, dishControllers.delete)
dishRoutes.patch("/image_dish/:dish_id", ensureAuthenticated, upload.single("image"), imageDishControllers.update)

module.exports = dishRoutes
