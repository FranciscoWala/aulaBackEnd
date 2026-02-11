/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de juros, utilizando
 * Funções para modularizar o código
 * Autor: Francisco Wala
 * Data:11/02/26
 * Versão: 1.0
 ***************************************************************************/

//Import da biblioteca de calculos financeiros
const calculos = require('./modulo/calculos.js')

const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
entradaDeDados.question('Digite o nome do cliente: ', function(nome) {
    let nomeCliente = nome
    entradaDeDados.question('Digite o nome o produto: ', function(produto) {
    let nomeProduto = produto
        entradaDeDados.question('Digite o valor da compra: ', function(valor) {
        let valorCompra = valor
                entradaDeDados.question('Digite a taxa de juros: ', function(taxa) {
                let taxaJuros = taxa
                    entradaDeDados.question('Digite a quantidade de parcelas: ', function(parcelas) {
                    let qtdeParcelas = parcelas
                    
                    //Chama a função para calcular o valor do montante
                    let montante = calculos.calcularJurosCompostos(valorCompra, taxaJuros, qtdeParcelas)
                    //Validação para verificar se o calculo foi realizado
                    if(montante){
                        console.log('O valor final é: ' + montante)
                    }else{
                        console.log('ERRO: Não foi possível processar o calculo')
                        entradaDeDados.close()
                    }
                })
            })
        })
    })
})