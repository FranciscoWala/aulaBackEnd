/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de sexo no banco de dados
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

const insertSexo = async function (dados) {
    
    try {

        let sql = `
        insert into tbl_sexo (
	    sigla,
        sexo
        ) values (
	    '${dados.sigla}',
        '${dados.sexo}'
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

const selectAllSexo = async function (dadosSexo) {
    try {
        let sql = `select * from tbl_sexo order by id desc;`
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


module.exports = {
    insertSexo,
    selectAllSexo
}