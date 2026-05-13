/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de genero no banco de dados
 * MySQL
 * Data: 08/05/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/
//Import do biblioteca do knex
const knex = require('knex')
//Fazendo o importe do arquivo de configuração para o acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function (genero) {
    
    try {
        let sql = `
        
        insert into tbl_genero (
	    tipo_genero
        ) values (
	        '${genero.tipo_genero}'
        );`
        //console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)
        //console.log(`erro no resultado da conexão com o banco sql ${result}`)
        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        // console.log(`erro no catch ${error}`)
        return false
        
    }

}

const selectAllGenero = async function (genero) {
    try {
        let sql = `select * from tbl_genero order by id desc;`
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

const selectByIdGenero = async function (id) {
    let sql = `select * from tbl_genero where id = ${id};`

    try {
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

const updateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set
            tipo_genero = '${genero.tipo_genero}'
            where id = ${genero.id};`

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

const deleteGenero  = async function (id) {
    try {
        let sql = `delete from tbl_genero where id=${id}`

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
    insertGenero,
    selectAllGenero,
    selectByIdGenero,
    updateGenero,
    deleteGenero
}

