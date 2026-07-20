/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de profissional no banco de dados
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

const insertProfissional = async function (dados) {
    
    try {

        let sql = `insert into tbl_profissional (
	nome,
    data_nascimento,
    foto_url,
    biografia,
    pais_origem,
    id_sexo
) values (
	'${dados.nome}',
	'${dados.data_nascimento}',
    '${dados.foto_url}',
    '${dados.biografia}',
    '${dados.pais_origem}',
    ${dados.id_sexo}
);`
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

const selectAllProfissional = async function () {
    try {
        let sql = `select * from tbl_profissional order by id desc;`
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

const selectByIdProfissional = async function (id) {
    let sql = `select * from tbl_profissional where id = ${id};`

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

const updateProfissional = async function (dados) {
    try {
        let sql = `update tbl_profissional set
            nome = '${dados.nome}',
            data_nascimento = '${dados.data_nascimento}',
            foto_url = '${dados.foto_url}',
            biografia = '${dados.biografia}',
            pais_origem = '${dados.pais_origem}',
            id_sexo = ${dados.id_sexo}
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

const deleteProfissional  = async function (id) {
    try {
        let sql = `delete from tbl_profissional where id=${id}`

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
    insertProfissional,
    selectAllProfissional,
    selectByIdProfissional,
    updateProfissional,
    deleteProfissional
}