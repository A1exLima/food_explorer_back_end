require("dotenv/config")
require("express-async-errors")

const AppError = require("./utils/appError")
const express = require("express")
const app = express()

const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(express.json())

const cors = require("cors")
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://fedelivery.netlify.app",
    ],
    credentials: true,
  })
)

const sqliteConnection = require("./dataBase/sqlite")
sqliteConnection()



const uploadConfigs = require("./configs/uploads")
app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER))
app.use("/files_image", express.static(uploadConfigs.UPLOADS_FOLDER_DISH))

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

const port = process.env.PORT || 3333
app.listen(port, () => console.log(`Server is running on port: ${port}`))
