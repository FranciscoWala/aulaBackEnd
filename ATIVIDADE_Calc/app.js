/***********************************************************
 * Autor: Francisco Wala Noronha Macedo
 * Projeto: Calculadora
 * Data: 13/02/26
 * Versão: 1.0
 ***********************************************************/

const operacao1 = require('./modulos/soma')
const operacao2 = require('./modulos/divisao')
const operacao3 = require('./modulos/multiplicacao')
const operacao4 = require('./modulos/subtracao')
const escolha = require('./modulos/validacao')

const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input : process.stdin,
    output : process.stdout 
})

entradaDeDados.question('Digite a operação:(Soma, multiplicação, divisão ou subtração) ', function(operadores){
let escolhaDoUsuario = operadores
    entradaDeDados.question('Certo, digite o primeiro numero:', function(numero1){
    let valor1 = numero1
            entradaDeDados.question('Obrigado, agora digite o outro número: ', function(numero2){
            let valor2 = numero2

            console.log(escolha.validarEntrada(escolhaDoUsuario, valor1, valor2))
            
            entradaDeDados.close()

        })
    })
})
