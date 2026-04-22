/******************************************************************************
 * Objetivo: Arquivo responsável pela padronização e STATUS_CODE do projeto de
 *      filmes 
 * Data: 17/04/26
 * Autor: Francisco Wala
 * Versão: 1.0
 ******************************************************************************/

//Padronização dos retornos da API (Cabeçalho) 
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar projeto de Filmes',
    development: 'Francisco Wala Noronha Macedo',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}
//Mensagens de erro do projeto de filmes
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a um erro interno no servidor [MODEL]'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a um erro interno no servidor [CONTROLLER]'
}

//Mensagens de SUCESSO do projeto de filmes
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON'
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE
}