<p align="center">
  <h1 align="center"><a href="https://fedelivery.netlify.app/">Food Explorer - Back-end :rocket: </a></h1>
</p>

<p align="center">
  <img width="550" height="99" src="https://uploaddeimagens.com.br/images/004/721/461/original/brandFoodExplorer.png">
</p>

___

## 💻 Sobre
Este repositório contém o código-fonte da API back-end desenvolvida como desafio final par ao curso da Rocketseat. A API é parte integrante do ecossistema do FoodExplorer, um restaurante inovador que busca proporcionar uma experiência gastronômica única.

___

## 🛠 Tecnologias

As seguintes tecnologias foram empregadas na criação deste projeto:

- [Node.js](https://nodejs.org/en/): Ambiente de execução que permite os desenvolvedores usem JavaScript para criar aplicativos do lado do servidor.
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Linguagem de programação de alto nível, orientada a objetos e de script.
- [express (v4.18.2)](https://expressjs.com): Framework web para Node.js, simplificando o desenvolvimento de aplicações web e APIs.
- [express-async-errors (v3.1.1)](https://www.npmjs.com/package/express-async-errors): Tratamento eficiente de erros assíncronos.
- [Nodemon](https://nodemon.io/): Ferramenta que monitora mudanças nos arquivos de um aplicativo Node.js e reinicia automaticamente o servidor sempre que ocorrem alterações.
- [sqlite (v5.1.1) e sqlite3 (v5.1.6)](https://www.sqlite.org/index.html): Bancos de dados leves e eficientes para armazenamento de informações.
- [knex (v3.0.1)](https://knexjs.org/): Construtor de consultas SQL para Node.js, facilitando a interação com bancos de dados.
- [bcryptjs (v2.4.3)](https://www.npmjs.com/package/bcryptjs): Para segurança e criptografia de senhas.
- [jsonwebtoken (v9.0.2)](https://www.npmjs.com/package/jsonwebtoken): Implementação de tokens JWT para autenticação segura.
- [multer (v1.4.5-lts.1)](https://www.npmjs.com/package/multer): Middleware para manipulação de dados de formulário, permitindo o envio de arquivos.
- [cors (v2.8.5)](https://www.npmjs.com/package/cors): Facilitando a integração entre back-end e front-end.
- [dotenv (v16.3.2)](https://www.npmjs.com/package/dotenv): Gerenciamento de variáveis de ambiente para configuração flexível 
- [pm2 (v5.3.1)](https://pm2.keymetrics.io/): Gerenciador de processos para Node.js, garantindo escalabilidade e estabilidade.
___

## 📑 Estrutura Banco de dados

![Screenshot_3](https://uploaddeimagens.com.br/images/004/721/555/original/dataBase.png)

___

## 🚀 Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
$ git clone git@github.com:A1exLima/rocketseat-stage8-backend-desafio.git
```
___

#### 🚧 Executando o BackEnd
```bash
# No BackEnd altere o nome do arquivo .env.example para .env e insira uma porta e um secret no arquivo vazio, como no exemplo abaixo
  AUTH_SECRET="default"
  PORT="3310"

# Navegue até o diretório do BackEnd
$ cd rocketseat-stage8-backend-desafio

# Instale as dependências necessárias
$ npm install

# Agora inicie o servidor do BackEnd
$ npm run dev
```
___

[O resultado FINAL pode ser visto aqui](https://fedelivery.netlify.app/)