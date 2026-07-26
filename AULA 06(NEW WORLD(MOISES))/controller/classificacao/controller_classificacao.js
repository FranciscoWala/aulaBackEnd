/***************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para
 *      realizar um CRUD de classificação
 * Data: 20/05/26
 * Autor: Francisco Wala
 * versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração de mensagem do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (classificacaoFilme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(classificacaoFilme, contentType)

        if (validar) {
            return validar
        } else {
            let result = await classificacaoDAO.insertClassificacao(classificacaoFilme)

            if (result) {
                
                classificacaoFilme.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = classificacaoFilme //Retorna no json o classificacao que foi inserido
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)
            }
        }

    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)
    }

}

const atualizarClassificacao = async function (classificacaoFilme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarClassificacao = await buscarClassificacao(id)

            if (resultBuscarClassificacao.status) {
                
                let validar = await validarDados(classificacaoFilme, contentType)

                if (!validar) {

                    classificacaoFilme.id = Number(id)
                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacaoFilme))
                    // console.log(result);
                    
                    //let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                        customMessage.DEFAULT_MESSAGE.response = classificacaoFilme

                        return customMessage.DEFAULT_MESSAGE //200 - OK
                    
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return resultBuscarClassificacao //404 ou 400 ou 500
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE //415
        }

    } catch(error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarClassificacao = async function() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await classificacaoDAO.selectAllClassificacao()

        if (result) {
            if (result.length >= 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.classificacao = result

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

const buscarClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if (result) {
                // console.log(result.length);
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result
                    
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

const excluirClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        
        let resultBuscarClassificacao = await buscarClassificacao(id)

        if(resultBuscarClassificacao.status) {
            //Chama o função do DAO para excluir o filme
            let result = await classificacaoDAO.deleteClassificacao(id)
            
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
            }
        } else {
            return resultBuscarClassificacao //400 ou 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}

const tratarDados = async function (classificacaoFilme) {

    classificacaoFilme.nome = classificacaoFilme.nome.replaceAll(" ' " ,"")
    classificacaoFilme.idade_limite = classificacaoFilme.idade_limite.replaceAll(" ' " ,"")
    classificacaoFilme.sigla = classificacaoFilme.sigla.replaceAll(" ' " ,"")
    classificacaoFilme.icon_url = classificacaoFilme.icon_url.replaceAll(" ' " ,"")
    classificacaoFilme.descricao = classificacaoFilme.descricao.replaceAll(" ' " ,"")

    return classificacaoFilme
}

//Finalizei aqui, segue finalizando a controller e depois vai pro PostMan e testa e já era
const validarDados = async function (dados, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

        if (dados.nome == undefined || dados.nome == '' || dados.nome.length > 20 || dados.nome == null) {
            customMessage.ERROR_BAD_REQUEST.field = '[Nome] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        }else if (dados.idade_limite == undefined || dados.idade_limite.nome == '' || dados.idade_limite == null){
            customMessage.ERROR_BAD_REQUEST.field = '[Idade] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        }else if (dados.sigla == undefined || dados.sigla == '' || dados.sigla.length > 5 || dados.sigla == null){
            customMessage.ERROR_BAD_REQUEST.field = '[Sigla] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        }else if (dados.icon_url == undefined || dados.icon_url == '' || dados.icon_url.length > 255 || dados.icon_url == null){
            customMessage.ERROR_BAD_REQUEST.field = '[Icone] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        }else if (dados.descricao == undefined || dados.descricao == '' || dados.descricao.length > 200 || dados.descricao == null){
            customMessage.ERROR_BAD_REQUEST.field = '[Descrição] INVÁLIDO' // erro 400
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    } else {
        return customMessage.ERROR_CONTENT_TYPE //erro 415
    }

}



module.exports = {
    inserirNovaClassificacao,
    listarClassificacao,
    buscarClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}