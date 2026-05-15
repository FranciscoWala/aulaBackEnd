/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de sexo
 * Data: 15/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const inserirNovoSexo = async function (sexoFilme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(sexoFilme, contentType)

        if (validar) {
            return validar
        } else {
            let result = await sexoDAO.insertSexo(sexoFilme)

            if (result) {

                sexoFilme.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = sexoFilme //Retorna no json o sexo que foi inserido
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)
    }

}

const atualizarSexo = async function (sexoFilme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarSexo = await buscarSexo(id)

            if (resultBuscarSexo.status) {
                
                let validar = await validarDados(sexoFilme, contentType)

                if (!validar) {

                    sexoFilme.id = Number(id)
                    let result = await sexoDAO.updateSexo(await tratarDados(sexoFilme))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = sexoFilme

                        return customMessage.DEFAULT_MESSAGE //200 - OK
                    
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return resultBuscarSexo //404 ou 400 ou 500
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch(error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarSexo = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await sexoDAO.selectAllSexo()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.sexo = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.DEFAULT_MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 Se veio um false, duas options, banco caiu ou erro no DAO
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
}

const buscarSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await sexoDAO.selectByIdSexo(id)

            if (result) {
                // console.log(result.length);
                
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result
                    
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

const tratarDados = async function (sexoFilme) {
    sexoFilme.sigla = sexoFilme.sigla.replaceAll(" ' " ,"")
    sexoFilme.sexo = sexoFilme.sexo.replaceAll(" ' " ,"")

    return sexoFilme
}

const validarDados = async function (dados, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        if (dados.sigla == undefined || dados.sigla == '' || dados.sigla.length > 3 || dados.sigla == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[sigla] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.sexo == undefined || dados.sexo == '' || dados.sexo.length > 15 || dados.sexo == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[sexo] INVÁLIDA' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    } else {
        return customMessage.ERROR_CONTENT_TYPE //erro 415
    }

}

const excluirSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarSexo = await buscarSexo(id)

        if(resultBuscarSexo.status) {
            //Chama o função do DAO para excluir o filme
            let result = await sexoDAO.deleteSexo(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarSexo //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}

module.exports = {
    inserirNovoSexo,
    listarSexo,
    buscarSexo,
    atualizarSexo,
    excluirSexo
}