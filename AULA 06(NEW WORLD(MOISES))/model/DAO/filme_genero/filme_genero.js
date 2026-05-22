/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de filme_genero no banco de dados
 * MySQL
 * Data: 22/05/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/
//Import do biblioteca do knex
const knex = require('knex')
//Fazendo o importe do arquivo de configuração para o acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)
//Função pra inserirr filmeGenero
const insertFilmeGenero = async function (filmeGenero) {
    
    try {
        let sql = `
        
        insert into tbl_filme_genero (
        id_filme,
        id_genero
        ) values (
            ${filmeGenero.id_filme},
            ${filmeGenero.id_genero}
        );`
        //console.log(`erro no script sql ${sql}`)

        let result = await knexConection.raw(sql)
        //console.log(`erro no resultado da conexão com o banco sql ${result}`)
        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(`erro no catch ${error}`)
        return false
        
    }

}
//Função pra listar todos filmeGenero
const selectAllFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `select * from tbl_filme_genero order by id desc;`
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
//Função pra buscar filmeGenero por id
const selectByIdFilmeGenero = async function (id) {
    let sql = `select * from tbl_filme_genero where id = ${id};`

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
//Função para retornar os dados do genero filtrando pelo id do filme
const selectGenerosByIdFilme = async function (idFilme) {
    let sql = `select tbl_genero.*
                from tbl_filme
                    inner join tbl_filme_genero
                        on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genero.id_genero
                where tbl_filme.id = ${idFilme}`

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

const selectFilmesByIdGenero = async function (idGenero) {
    let sql = `select tbl_filme.*
                from tbl_filme
                    inner join tbl_filme_genero
                        on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genero.id_genero
                where tbl_genero.id = ${idGenero}`

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

//Função pra atualizar filmeGenero
const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `update tbl_filme_genero set
            id_filme = ${filmeGenero.id_filme},
            id_genero = ${filmeGenero.id_genero}
            where id = ${filmeGenero.id};`

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
//Função pra excluir filmeGenero
const deleteFilmeGenero  = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`

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
    insertFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    updateFilmeGenero,
    deleteFilmeGenero
}