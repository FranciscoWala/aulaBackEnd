/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de genero
 * Data: 08/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
 const configMessages = require('../modulo/configMessages.js')

 //Import do arquivo do DAO para manipular os dados de filme no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirNovoGenero = async function(generoFilme, contentType){
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        
        let validar = await validarDados(generoFilme, contentType) //415 = erro de conteudo do header ou 400 erro de usuario
        // console.log(validar)
        if(validar){
            return validar

        } else {
            let result = await generoDAO.insertGenero(generoFilme)

            if (result) {

                generoFilme.id = result
                customMessage.DEFAULT_MESSAGE.status =          customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code =     customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message =         customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = generoFilme
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {

                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)

            }

        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)

    }

}

const validarDados = async function(generoFilme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
        let max = 50
        let min = 0
        if(generoFilme == undefined || generoFilme == '' || generoFilme.length > max || generoFilme.length < min || generoFilme == null){

            customMessage.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO' //erro 400
            return customMessage.ERROR_BAD_REQUEST
        }

    } else {
        return customMessage.ERROR_CONTENT_TYPE //erro 415
    }
}

module.exports = {
    inserirNovoGenero,
}