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
const atualizarFilme = async function () {

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
        if (String(id).replaceAll(' ', '') == '' || id == '' || id == undefined || id == null || isNaN(id)) {
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
        if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80) {
            customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
            customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
            customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
            customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
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
