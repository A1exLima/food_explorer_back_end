const { Router } = require("express")
const sessionsRoutes = Router()

const verifyFieldsIfEmpty = require("../middlewares/verifyFieldsIfEmpty")


const sessionsControllers = require("../controllers/sessionsControllers")
sessionsRoutes.post("/", verifyFieldsIfEmpty, sessionsControllers.create)

module.exports = sessionsRoutes
