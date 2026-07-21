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
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')
// const { buscarFilme } = require('./controller_filme.js')

const inserirNovoFilmeGenero = async function (filmeGeneroFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(filmeGeneroFilme) //415 = erro de conteudo do header ou 400 erro de usuario
        // console.log(validar)
        if (validar) {
            return validar
        } else {
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGeneroFilme)

            if (result) {

                filmeGeneroFilme.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status //Retorna status 201 de item criado
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code //Retorna o status_code 201
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message //Retorna a mensagem de sucesso
                customMessage.DEFAULT_MESSAGE.response = filmeGeneroFilme
                return customMessage.DEFAULT_MESSAGE //201 deu certo

            } else {

                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (MODEL)

            }

        }

    } catch (error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //Erro 500 (CONTROLLER)

    }

}
const atualizarFilmeGenero = async function (filmeGenero, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarGenero = await buscarFilmeGenero(id)

        if (resultBuscarGenero.status) {

            let validar = await validarDados(filmeGenero)

            if (!validar) {

                filmeGenero.id = id
                let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
                // console.log(result);

                if (result) {

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM
                    customMessage.DEFAULT_MESSAGE.response = filmeGenero

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
    } catch (error) {
        // console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const listarFilmeGenero = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
//Função para buscar filme_genero
const buscarFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if (result) {
                // console.log(result.length);

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
//Função para buscar os generos filtrando pelo id do filme
const buscarGenerosIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

            if (result) {
                // console.log(result.length);

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
//Função para buscar os filmes filtrando pelo id do genero
const buscarFilmesIdGenero = async function (idGenero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (idGenero == undefined || String(idGenero).replaceAll(' ', '') == '' || idGenero == '' || idGenero == null || isNaN(idGenero) || idGenero <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO]INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

            if (result) {
                // console.log(result.length);

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
//Função para excluir filme_genero
const excluirFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarGenero = await buscarFilmeGenero(id)

        if (resultBuscarGenero.status) {
            //Chama o função do DAO para excluir o filme
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if (result) {
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
//Função para excluir a relação de generos com o filme
const excluirGenerosIdFilme = async function (idFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama o função do DAO para excluir o filme
        let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 -- model
        }

    } catch (error) {

        console.log(`Erro na controller catch ${error}`);
        
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -- Controller
    }

}
//Função para validar filme_genero
const validarDados = async function (filmeGeneroFilme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))


    if (filmeGeneroFilme.id_filme == undefined || filmeGeneroFilme.id_filme == '' || isNaN(filmeGeneroFilme.id_filme) || filmeGeneroFilme.id_filme == null || filmeGeneroFilme.id_filme <= 0) {

        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO' //erro 400
        return customMessage.ERROR_BAD_REQUEST

    } else if (filmeGeneroFilme.id_genero == undefined || filmeGeneroFilme.id_genero == '' || isNaN(filmeGeneroFilme.id_genero) || filmeGeneroFilme.id_genero == null || filmeGeneroFilme.id_genero <= 0) {

        customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO' //erro 400
        return customMessage.ERROR_BAD_REQUEST

    } else {
        return false
    }
}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGenerosIdFilme,
    buscarFilmesIdGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirGenerosIdFilme
}