/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de cargo
 * Data: 20/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const cargoDAO = require('../../model/DAO/cargo/cargo.js')

const inserirNovoCargo = async function (cargoFilme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(cargoFilme, contentType)

        if (validar) {
            return validar
        } else {
            let result = await cargoDAO.insertCargo(cargoFilme)

            if (result) {

                cargoFilme.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = cargoFilme //Retorna no json o cargo que foi inserido
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)
    }

}

const atualizarCargo = async function (cargoFilme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarCargo = await buscarCargo(id)

            if (resultBuscarCargo.status) {
                
                let validar = await validarDados(cargoFilme, contentType)

                if (!validar) {

                    cargoFilme.id = Number(id)
                    let result = await cargoDAO.updateCargo(await tratarDados(cargoFilme))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = cargoFilme

                        return customMessage.DEFAULT_MESSAGE //200 - OK
                    
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return resultBuscarCargo //404 ou 400 ou 500
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch(error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarCargo = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await cargoDAO.selectAllCargo()

        if (result) {
            if (result.length >= 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.cargo = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 Se veio um false, duas options, banco caiu ou erro no DAO
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
}

const buscarCargo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await cargoDAO.selectByIdCargo(id)

            if (result) {
                // console.log(result.length);
                
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.cargo = result
                    
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

const excluirCargo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarCargo = await buscarCargo(id)

        if(resultBuscarCargo.status) {
            //Chama o função do DAO para excluir o filme
            let result = await cargoDAO.deleteCargo(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarCargo //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}

const tratarDados = async function (cargoFilme) {

    cargoFilme.cargo = cargoFilme.cargo.replaceAll(" ' " ,"")

    return cargoFilme
}

const validarDados = async function (dados, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        if (dados.cargo == undefined || dados.cargo == '' || dados.cargo.length > 50 || dados.cargo == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[cargo] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    } else {
        return customMessage.ERROR_CONTENT_TYPE //erro 415
    }

}



module.exports = {
    inserirNovoCargo,
    listarCargo,
    buscarCargo,
    atualizarCargo,
    excluirCargo
}