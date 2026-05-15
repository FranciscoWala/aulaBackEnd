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

const atualizarGenero = async function (generoFilme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarGenero = await buscarGenero(id)

            if (resultBuscarGenero.status) {
                
                let validar = await validarDados(generoFilme, contentType)

                if (!validar) {

                    generoFilme.id = Number(id)
                    let result = await generoDAO.updateGenero(await tratarDados(generoFilme))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = generoFilme

                        return customMessage.DEFAULT_MESSAGE //200 - OK
                    
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return resultBuscarGenero //404 ou 400 ou 500
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch(error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarGenero = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await generoDAO.selectAllGenero()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.genero = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.DEFAULT_MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //Se veio um false, duas options, banco caiu ou erro no DAO
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}

const buscarGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await generoDAO.selectByIdGenero(id)

            if (result) {
                // console.log(result.length);
                
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result
                    
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    // console.log('lufghlsfkdgh')
                    return customMessage.ERROR_NOT_FOUND
                }

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Finalizar o CRUD por aqui, falta o app do delete e aqui(controller)

const excluirFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarGenero = await buscarGenero(id)

        if(resultBuscarGenero.status) {
            //Chama o função do DAO para excluir o filme
            let result = await generoDAO.deleteGenero(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarGenero //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
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

const tratarDados = async function (generoFilme) {
    generoFilme.tipo_genero = generoFilme.tipo_genero.replaceAll(" ' " ,"")

    return generoFilme
}

module.exports = {
    inserirNovoGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    excluirFilme
}