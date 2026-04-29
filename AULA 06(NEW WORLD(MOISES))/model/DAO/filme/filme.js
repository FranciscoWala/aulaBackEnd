/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do filme no banco de dados
 * MySQL
 * Data: 15/04/26
 * Autor: Francisco Wala
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca para manipular dados no banco de dados MySQL
const knex = require('knex')
//Fazendo o import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig')
//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir novo filme no banco de dados
const insertFilme = async function (filme) {

    try {

        let sql = ` insert into tbl_filme (
        nome,
        sinopse,
        capa,
        data_lancamento,
        duracao,
        valor,
        avaliacao
    ) values (
        '${filme.nome}',
        '${filme.sinopse}',
        '${filme.capa}',
        '${filme.data_lancamento}',
        '${filme.duracao}',
        '${filme.valor}',
        if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')

    ); `

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {
    //Aula de hoje 29/04/26 Estela é aqui que você vai se focar
    //Script correto abaixo:
    try {
        let sql = 
        `
            update tbl_filme set
                nome                = '${filme.nome}',
                sinopse             = '${filme.sinopse}',
                capa                = '${filme.capa}',
                data_lancamento     = '${filme.data_lancamento}',
                duracao             = '${filme.duracao}',
                valor               = '${filme.valor}',
                avaliacao           = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
            where id            = ${filme.id};
        `;

        let result = await knexConection.raw(sql);

        if (result)
            return true
        else
            return false
        

    } catch (error) {
        return false;
    }

}

//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function () {
    try {
        //Script sql para listar todos os filmes
        let sql = 'select * from tbl_filme order by id desc'
        //Executo no banco de dados o script e guarda o retorno do banco,
        //pode ser um ERRO (False), ou um array com os dados
        let result = await knexConection.raw(sql)
        //Validação para verificar se o retorno do BD é um Array ou boolean (False)
        if (Array.isArray(result)) {
            //Retorna somente o índice com a lista de filmes
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        
    }
}
//Função para retornar um filme filtrando pelo ID
const selectByIdFilme = async function (id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await knexConection.raw(sql)
        
        if(Array.isArray(result)){
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um filme pelo ID
const deletefilme = async function (id) {

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deletefilme,
}