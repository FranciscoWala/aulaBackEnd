/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de nacionalidade de profissional
 * Data: 15/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const nacionalidadeProfissionalDAO = require('../../model/DAO/nacionalidade_profissional/nacionalidade_profissional.js')

const inserirNovaNacionalidadeProfissional = async function (nacionalidadeProfissional) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(nacionalidadeProfissional)

        if (validar) {
            return validar
        } else {
            let result = await nacionalidadeProfissionalDAO.insertNacionalidadeProfissional(nacionalidadeProfissional)

            if (result) {

                nacionalidadeProfissional.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = nacionalidadeProfissional //Retorna no json a nacionalidade do profissional que foi inserida
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)
    }

}
const atualizarNacionalidadeProfissional = async function (nacionalidadeProfissional, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarNacionalidadeProfissional = await buscarNacionalidadeProfissional(id)

            if (resultBuscarNacionalidadeProfissional.status) {
                
                let validar = await validarDados(nacionalidadeProfissional, contentType)

                if (!validar) {

                    nacionalidadeProfissional.id = Number(id)
                    let result = await nacionalidadeProfissionalDAO.updateNacionalidadeProfissional(await tratarDados(nacionalidadeProfissional))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = nacionalidadeProfissional

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
const listarNacionalidadeProfissional = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await nacionalidadeProfissionalDAO.selectAllNacionalidadeProfissional()

        if (result) {
            if (result.length >= 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

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
const buscarNacionalidadeProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeProfissionalDAO.selectByIdNacionalidadeProfissional(id)

            if (result) {
                // console.log(result.length);
                
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeProfissional = result
                    
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
const buscarNacionalidadeIdProfissional = async function (idProfissional) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (idProfissional == undefined || String(idProfissional).replaceAll(' ', '') == '' || idProfissional == '' || idProfissional == null || isNaN(idProfissional) || idProfissional <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await nacionalidadeProfissionalDAO.selectByIdNacionalidadeProfissional(idProfissional)

            if (result) {
                // console.log(result.length);

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeProfissional = result

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
const buscarProfissionalIdNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await nacionalidadeProfissionalDAO.selectByIdNacionalidadeProfissional(idNacionalidade)

            if (result) {
                // console.log(result.length);

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeProfissional = result

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
const tratarDados = async function (nacionalidadeProfissional) {
    nacionalidadeProfissional.id_nacionalidade = nacionalidadeProfissional.id_nacionalidade.replaceAll(" ' " ,"")
    nacionalidadeProfissional.id_profissional = nacionalidadeProfissional.id_profissional.replaceAll(" ' " ,"")

    return nacionalidadeProfissional
}
const excluirNacionalidadeProfissional = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarNacionalidadeProfissional = await buscarNacionalidadeProfissional(id)

        if(resultBuscarNacionalidadeProfissional.status) {
            //Chama o função do DAO para excluir o filme
            let result = await nacionalidadeProfissionalDAO.deleteNacionalidadeProfissional(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarNacionalidadeProfissional //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}
const excluirNacionalidadeIdProfissional = async function (idProfissional) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama o função do DAO para excluir o filme
        let result = await nacionalidadeProfissionalDAO.deleteNacionalidadeProfissionalByIdProfissional(idProfissional)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
        }

    } catch (error) {

        //console.log(`Erro na controller catch ${error}`);
        
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}
const validarDados = async function (dados) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

        if (dados.id_nacionalidade == undefined || dados.id_nacionalidade == '' || dados.id_nacionalidade == null || dados.id_nacionalidade <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[id_nacionalidade] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else if (dados.id_profissional == undefined || dados.id_profissional == '' || dados.id_profissional == null || dados.id_profissional <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[id_profissional] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }

}
module.exports = {
    inserirNovaNacionalidadeProfissional,
    listarNacionalidadeProfissional,
    buscarNacionalidadeProfissional,
    buscarNacionalidadeIdProfissional,
    buscarProfissionalIdNacionalidade,
    atualizarNacionalidadeProfissional,
    excluirNacionalidadeProfissional,
    excluirNacionalidadeIdProfissional
}