/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de nacionalidade de 
 * profissional no banco de dados
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

const insertNacionalidadeProfissional = async function (dados) {
    
    try {

        let sql = `
        insert into tbl_nacionalidade_profissional (
        id_nacionalidade,
        id_profissional
        ) values (
        '${dados.id_nacionalidade}',
        '${dados.id_profissional}'
                );
        `
        //console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)

        if (result) {
            return result[0].insertId
        } else {
            return false
        }

    } catch (error) {
        // console.log(`erro no catch ${error}`)
        return false
    }

}

const selectAllNacionalidadeProfissional = async function (dadosNacionalidadeProfissional) {
    try {
        let sql = `select * from tbl_nacionalidade_profissional order by id desc;`
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

const selectByIdNacionalidadeProfissional = async function (id) {
    let sql = `select * from tbl_nacionalidade_profissional where id = ${id};`

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

const updateNacionalidadeProfissional = async function (nacionalidadeProfissional) {
    try {
        let sql = `update tbl_nacionalidade_profissional set
            id_nacionalidade = '${nacionalidadeProfissional.id_nacionalidade}',
            id_profissional = '${nacionalidadeProfissional.id_profissional}'
            where id = ${nacionalidadeProfissional.id};`

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

const deleteNacionalidadeProfissional  = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade_profissional where id=${id}`

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
    insertNacionalidadeProfissional,
    selectAllNacionalidadeProfissional,
    selectByIdNacionalidadeProfissional,
    updateNacionalidadeProfissional,
    deleteNacionalidadeProfissional
}