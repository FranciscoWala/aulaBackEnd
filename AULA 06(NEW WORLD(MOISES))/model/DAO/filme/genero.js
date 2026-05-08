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
	        '${genero}'
        );`
        //console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)
        //console.log(`erro no resultado da conexão com o banco sql ${result}`)
        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
        //console.log(`erro no catch ${error}`)
    }

}

