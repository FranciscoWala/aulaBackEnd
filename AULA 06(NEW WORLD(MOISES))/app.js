//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Permitindo a ultilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto do express para criar a API
const app = express()

//Configuração do CORS da API
const corsOptions = {
    origin: ['*'],   //Configuração de origem da requisição (IP ou Domínio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS',  //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados  //Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))
//Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//ENDPOINTS
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {

    //Recebendo o tipo de dadaos da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']
    //Recebendo o body da requisição
    let dados = request.body
    //Chama a função de inserir e encaminha os dados do filme e o content-type
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})
//Nunca colocar verbo na assinatura
app.get('/v1/senai/locadora/filme', async function (request, response) {

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function (request, response) {
    //Recebe o ID do filme no parâmetro
    let idNumber = request.params.id
    let result = await controllerFilme.buscarFilme(idNumber)

    response.status(result.status_code)
    response.json(result)
})

//Fazer o Start da API (Aguardando requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})