const { Router } = require("express")
const searchCepRoutes = Router()

const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")


const searchCepControllers = require("../controllers/searchCepControllers")
searchCepRoutes.post("/", verifyFieldsIfEmpty, searchCepControllers.show)

module.exports = searchCepRoutes
