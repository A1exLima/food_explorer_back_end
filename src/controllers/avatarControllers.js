const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const DiskStorage = require("../providers/diskStorage")

class AvatarControllers {
  async update(request, response) {
    const user_id = request.user.id
    const avatarName = request.file.filename
    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado", 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const fileName = await diskStorage.saveFile(avatarName)

    await knex("users")
      .update({
        avatar: fileName,
        updated_at: knex.raw(
          "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
        ),
      })
      .where({ id: user_id })

    const userUpdate = await knex("users").where({ id: user_id }).first()

    response.json(userUpdate)
  }
}

module.exports = new AvatarControllers()
