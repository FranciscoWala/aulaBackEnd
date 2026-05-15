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
//Import das controllers de genero
const controllerGenero = require('./controller/genero/controller_genero.js')
//Import das controllers de sexo
const controllerSexo = require('./controller/sexo/controller_sexo.js')

//ENDPOINTS

app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
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
//Para atualização específica, usa-se o patch, e para os casos de atualizar todos os dados usa-se o put
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response){
    //Recebe o contentType da requisição, para validar se é Json
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados do body, que serão modificados
    let dados = request.body
    //Chama função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequência que a função foi criada na controller
    let result = await controllerFilme.atualizarFilme( dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let dados = request.body

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    // console.log(`erro no result app ${result}`)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function(request, response){

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.put ('/v1/senai/locadora/genero/:id', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/genero/:id', async function( request, response){

    let id = request.params.id

    let result = await controllerGenero.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)

})

app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dados = request.body

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo', async function(request, response){

    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo/:id', async function (request, response){
    let id = request.params.id
    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

app.put ('/v1/senai/locadora/sexo/:id', bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//Fazer o Start da API (Aguardando requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})