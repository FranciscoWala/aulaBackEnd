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
    '${filme.avaliacao}'
); `
    //Encaminha para o BD o scriptSQL
    let result = await knexConection.raw(sql)
    
    if (result) 
        return true
    else 
        return false
    
}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {

}

//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function () {

}

//Função para retornar um filme filtrando pelo ID
const selectByIdFilme = async function (id) {

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