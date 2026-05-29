/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de avaliacao no banco de dados
 * MySQL
 * Data: 29/05/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/
//Import do biblioteca do knex
const knex = require('knex')
//Fazendo o importe do arquivo de configuração para o acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Parei aqui agora vai pra controller e depois montar o postman

const insertAvalicao = async function (dados) {
    
    try {

        let sql = `insert into tbl_avaliacao (
	tipo_avaliacao,
    avaliacao,
    descricao
    ) values (
	'${dados.tipo_avaliacao}',
    '${dados.avaliacao}',
    '${dados.descricao}'
);`
        // console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)

        if (result) {
            return result[0].insertId
        } else {
            return false
        }

    } catch (error) {
        console.log(`erro no catch ${error}`)
        return false
    }

}

const selectAllAvaliacao = async function (dadosAvaliacao) {
    try {
        let sql = `select * from tbl_avaliacao order by id desc;`
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

const selectByIdAvaliacao = async function (id) {
    let sql = `select * from tbl_avaliacao where id = ${id};`

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

const updateAvaliacao = async function (dadosAvaliacao) {
    try {
        let sql = ` update tbl_avaliacao set
		            tipo_avaliacao = '${dadosAvaliacao.tipo_avaliacao}',
		            avaliacao = '${dadosAvaliacao.avaliacao}'
			where id = ${id};`

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

const deleteAvaliacao  = async function (id) {
    try {
        let sql = `delete from tbl_avaliacao where id=${id}`

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
    insertAvalicao,
    selectAllAvaliacao,
    selectByIdAvaliacao,
    updateAvaliacao,
    deleteAvaliacao
}