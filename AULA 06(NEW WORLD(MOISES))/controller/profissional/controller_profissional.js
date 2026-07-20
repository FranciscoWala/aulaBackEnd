/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de profissional
 * Data: 15/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const profissionalDAO = require('../../model/DAO/profissional/profissional.js')

const controllerNacionalidadeProfissional = require('./controller_nacionalidade_profissional.js')

const inserirNovoProfissional = async function (profissional, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(profissional, contentType)

        if (validar) {
            return validar
        } else {
            let result = await profissionalDAO.insertProfissional(profissional)

            if (result) {

                profissional.id = result

                for(itemNacionalidade of profissional.nacionalidade) {
                    let resultNacionalidadeProfissional = {
                        "id_nacionalidade" : itemNacionalidade.id,
                        "id_profissional" : profissional.id
                    }
                    let resultNacionalidade = await controllerNacionalidadeProfissional.inserirNovaNacionalidadeProfissional(resultNacionalidadeProfissional)

                    if(!resultNacionalidade.status){
                        return customMessage.SUCCESS_CREATED_WARNING
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = profissional //Retorna no json o profissional que foi inserido
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)
    }

}

const atualizarProfissional = async function (profissional, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarProfissional = await buscarProfissional(id)

            if (resultBuscarProfissional.status) {
                
                let validar = await validarDados(profissional, contentType)

                if (!validar) {

                    profissional.id = Number(id)
                    let result = await profissionalDAO.updateProfissional(await tratarDados(profissional))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = profissional

                        return customMessage.DEFAULT_MESSAGE //200 - OK
                    
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return resultBuscarProfissional //404 ou 400 ou 500
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch(error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarProfissional = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await profissionalDAO.selectAllProfissional()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

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

const buscarProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await profissionalDAO.selectByIdProfissional(id)

            if (result) {
                // console.log(result.length);
                
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional = result
                    
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

const tratarDados = async function (profissional) {
    profissional.nome = profissional.nome.replaceAll(" ' " ,"")
    profissional.data_nascimento = profissional.data_nascimento.replaceAll(" ' " ,"")
    profissional.foto_url = profissional.foto_url.replaceAll(" ' " ,"")
    profissional.biografia = profissional.biografia.replaceAll(" ' " ,"")
    profissional.pais_origem = profissional.pais_origem.replaceAll(" ' " ,"")

    return profissional
}

const validarDados = async function (dados, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        if (dados.nome == undefined || dados.nome == '' || dados.nome.length > 80 || dados.nome == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[nome] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.data_nascimento == undefined || dados.data_nascimento == '' || dados.data_nascimento == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[data_nascimento] INVÁLIDA' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.foto_url == undefined || dados.foto_url == '' || dados.foto_url.length > 255 || dados.foto_url == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[foto_url] INVÁLIDA' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.biografia == undefined || dados.biografia == '' || dados.biografia == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[biografia] INVÁLIDA' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.pais_origem == undefined || dados.pais_origem == '' || dados.pais_origem.length > 60 || dados.pais_origem == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[pais_origem] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    } else {
        return customMessage.ERROR_CONTENT_TYPE //erro 415
    }

}

const excluirProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarProfissional = await buscarProfissional(id)

        if(resultBuscarProfissional.status) {
            //Chama o função do DAO para excluir o filme
            let result = await profissionalDAO.deleteProfissional(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarProfissional //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}

module.exports = {
    inserirNovoProfissional,
    listarProfissional,
    buscarProfissional,
    atualizarProfissional,
    excluirProfissional
}