require("express-async-errors")
const AppError = require("./utils/appError")

const express = require("express")
const app = express()

const sqliteConnection = require("./dataBase/sqlite")
sqliteConnection()

app.use(express.json())

const uploadConfigs = require("./configs/uploads")
app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER))

const routes = require("./routes")
app.use(routes)

app.use((error, request, response, next) => {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.statusCode,
      message: error.message,
    })
  }
  
  console.error(error)

  return response.status(500).json({
    error: "Error",
    message: "Internal Server Error",
  })
})

const port = 3310
app.listen(port, () => console.log(`Server is running on port: ${port}`))
