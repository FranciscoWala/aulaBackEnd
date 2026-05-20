/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de cargo no banco de dados
 * MySQL
 * Data: 20/05/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/
//Import do biblioteca do knex
const knex = require('knex')
//Fazendo o importe do arquivo de configuração para o acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertCargo = async function (dados) {
    
    try {

        let sql = `
        insert into tbl_cargo (
        cargo
        ) values (
        '${dados.cargo}'
        );
        `
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

const selectAllCargo = async function (dadosCargo) {
    try {
        let sql = `select * from tbl_cargo order by id desc;`
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

const selectByIdCargo = async function (id) {
    let sql = `select * from tbl_cargo where id = ${id};`

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

const updateCargo = async function (cargoFilme) {
    try {
        let sql = `update tbl_cargo set
	                cargo = '${cargoFilme.cargo}'
                    where id = ${cargoFilme.id};`

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

const deleteCargo  = async function (id) {
    try {
        let sql = `delete from tbl_cargo where id=${id}`

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
    insertCargo,
    selectAllCargo,
    selectByIdCargo,
    updateCargo,
    deleteCargo
}