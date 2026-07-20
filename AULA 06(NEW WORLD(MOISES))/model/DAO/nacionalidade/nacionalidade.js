/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de nacionalidade no banco de dados
 * MySQL
 * Data: 15/05/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/
//Import do biblioteca do knex
const knex = require('knex')
//Fazendo o importe do arquivo de configuração para o acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertNacionalidade = async function (dados) {
    
    try {

        let sql = `
            insert into tbl_nacionalidade (
	        nome_nacionalidade
        ) values (
         '${dados.nome_nacionalidade}'
         )
        `
        //console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)
        //console.log(result)
        if (result) {
            return result[0].insertId
        } else {
            return false
        }

    } catch (error) {
        //console.log(`erro no catch ${error}`)
        return false
    }

}

const selectAllNacionalidade = async function () {
    try {
        let sql = `select * from tbl_nacionalidade order by id desc;`
        let result = await knexConection.raw(sql)
        //console.log(`erro no resultado da conexão com o banco sql ${result}`)
        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        // console.log(`erro no catch ${error}`)
        return false

    }
}

const selectByIdNacionalidade = async function (id) {
    let sql = `select * from tbl_nacionalidade where id = ${id};`

    try {
        let result = await knexConection.raw(sql)
        // console.log(`erro no resultado da conexão com o banco sql ${result}`)
        if (Array.isArray(result))
            
            return result[0]

        else 
            return false

    } catch (error) {
        // console.log(`erro no catch ${error}`)
        return false
    }
}

const updateNacionalidade = async function (dados) {
    try {
        let sql = `update tbl_nacionalidade set
            nome_nacionalidade = '${dados.nome_nacionalidade}'
            where id = ${dados.id};`

            let result =  await knexConection.raw(sql);
            
            if (result) {
                return true
            } else {
                return false
            }

    } catch (error) {
        // console.log(error)
        return false;

    }

}

const deleteNacionalidade  = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id=${id}`

        let result = await knexConection.raw(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    updateNacionalidade,
    deleteNacionalidade
}