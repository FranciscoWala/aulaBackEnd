/**************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de estados
 * e cidades
 * Data: 01/04
 * Autou: Francisco Wala
 * Versão: 1.0
 **************************************************************************/

/***********************************************************************************************
 * Para configurar a API:
 * 
 * 1 - Instalar o EXPRESS   -> npm install express --save
 *  Dependencia para configurar e uitilizar o protocolo HTTP para criar a API
 * 
 ***********************************************************************************************

 * 2 - Instalar o CORS      -> npm install cors --save (Configura as permissões da API)
 *  Dependencia para configurar as permissões de acesso da API
 * 
 ************************************************************************************************/

//Sempre utilizar esses mesmos comandos, então decora, muda se for FastFy
//Import das dependencias para criar a API
const express   = require('express')
const cors      = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configuração do CORS da API
const corsOptions = {
    origin: ['*'],   //Configuração de origem da requisição (IP ou Domínio)
    methods: 'GET',  //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
                    //Tipo de dados  //Autrização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulos/funcoes.js')

//RESPONSE  --> Devolve do back
//REQUEST   --> Petição do front
app.get('/v1/senai/estados',function(request, response){
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200)//Requisição bem sucedida!!!
})

app.get('/v1/senai/dados/estado/:uf',function(request,response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({"message":"nenhum estado foi encontrado"})
        response.status(404)
    }
    
})
app.get('/v1/senai/dados/capital/estado/:uf',function(request,response){
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(sigla)
    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({"message":"nenhum estado foi encontrado"})
        response.status(404)
    }


})
app.get('/cidades', function(request,response){
    response.json({"message" : "Testando a API de cidades"})
    response.status(200)
})


//Fazer o Start da API (Aguardando requisições)
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})