const AppError = require("../utils/appError")
const knex = require("../dataBase/knex")
const DiskStorage = require("../providers/diskStorage")

class AvatarControllers {
  async update(request, response) {
    /*
    [x] - Capturar o id do usuário o nome do arquivo
    [x] - Instanciar o diskStorage para poder ter acesso as funções de saveFile e deleteFile
    [x] - Verificar se o usuário existe, se não lançar uma mensagem de erro
    [x] - Verificar se tem salvo algum nome de arquivo de upload antigo no banco de dados, caso tenha preciso deletar o arquivo na pasta uploads, para nao acumular imagens de avatares sem uso.
    [x] - A novo avatar upado encontra-se na para tmp, preciso alterar o local do arquivo para a pasta upload
    [x] - Guardar o nome do novo upload no banco de dados na coluna avatar.
    [x] - Retorna todos os dados do usuário via res.json()
    */
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
        updated_at: knex.raw("strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')")
      })
      .where({ id: user_id })

      const userUpdate = await knex("users").where({ id: user_id }).first()

    response.json(userUpdate)
    
  }
}

module.exports = new AvatarControllers()
