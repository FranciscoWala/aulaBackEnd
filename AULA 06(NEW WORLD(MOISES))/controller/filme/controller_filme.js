/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de filme
 * Data: 17/04/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')
//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Essa função serve para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        let validar = await validarDados(filme, contentType)

        if (validar) {
            return validar //400
        } else {
            //Encaminha os dados do filme para o DAO inserir no banco de dados
            let result = await filmeDAO.insertFilme(filme)

            if (result) { //201

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                return customMessage.DEFAULT_MESSAGE //201
            } else { //erro 500
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (CONTROLLER)
    }
}
//Função para atualizar um filme existente
const atualizarFilme = async function (filme, id, contentType) {

    //Depois de construir o DAO do método UPDATE, a gente vem pra cá, fazer as validações/funções
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    //Sempre que for mandado ID tem que ser pela URL, e sempre que um método receber o ID, tem que ser validado!
    //Requisição bem sucedida retorna um code HTTP 200 (201 não vai por que não é criado um 'FILME'(recurso) novo)
    //STATUS CODE para essa requisição:
        /*
        * 500 - model
        * 500 - controller
        * 404 - não encontrado
        * 400 - campos inválidos
        * 415 - content-type (json)
        * 400 - ID inválido
        * 200 - OK (Atualizar)
        */
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        //Validação para verificar se o conteúdo do body é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //Chama a função para buscar o filme e validar, se o ID está correto, se o ID existe no banco de dados e se o ID existe
            let resultBuscarFilme = await buscarFilme(id)

            if (resultBuscarFilme.status){

                //chama a função para validar o filme
                let validar = await validarDados(filme,contentType)
                if (!validar) {
                    //Adiciona um atributo ID no Json de filme, para enviar ao DAO um único objeto
                    filme.id = Number(id)
                    //Chama a funçãao para atualizar o filme no BD
                    let result = await filmeDAO.updateFilme(filme)
                    if (result) {
                        //Aqui eu criei a resposta
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        //Aqui eu retornei a resposta montada
                        return customMessage.DEFAULT_MESSAGE //200 (Atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 model
                    }

                } else {
                    return validar //400 (BAD_REQUEST) de validação dos campos do BD
                }

            } else {
                return resultBuscarFilme //400 (ID inválido) ou 404 (Não encontrado) ou 500 (erro na controller ou no DAO)
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
    }
}
//Função para retornar todos os filmes existentes
const listarFilme = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        //Chama a função do DAO para retornar a lista de filmes do banco de dados (BD)
        let result = await filmeDAO.selectAllFilme()
        //Validação para verificar se o DAO conseguiu processar o script no BD
        if (result) {
            //Validação para verificar se o conteúdo do ARRAY tem dados de retorno ou se está vazio
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                                                    //Aqui está criando um atributo dentro do response
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
                //response.filme = result

            } else {
                return customMessage.ERROR_NOT_FOUND //404
            }          
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function (id) {
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um número válido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] ÍNVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            //Chama a função do DAO para pesquisar o filme pelo id
            let result = await filmeDAO.selectByIdFilme(id)
            //Validação para verificar se o DAO retornou dados ou um FALSE (ERRO)
            if (result) {
                //Validação para verificar se o DAO tem algum dado no ARRAY
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //resposta de filme por id
                } else {
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}
//Função para excluir um filme
const excluirFilme = async function () {
    
}

const validarDados = async function (filme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        if (filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80) {
            customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.sinopse == undefined ||filme.sinopse == '' || filme.sinopse == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255) {
            customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
            customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if ( filme.duracao == undefined || filme.duracao == '' || filme.duracao == null ||filme.duracao.length < 5) {
            customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
            customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
            customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    }else{
        return customMessage.ERROR_CONTENT_TYPE
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
}
