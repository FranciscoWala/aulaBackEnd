/********************************************************************************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE E FOR
 * Data: 25/02
 * Autor: Francisco Wala Noronha Macedo
 * Versão: 1.0
 ********************************************************************************/

//Toda vez pensar em START e Stop e precisa também de um manipulador ex: i++
//Função para imprimir a tabuada

//Import da biblioteca de cálculos matemáticos
const calculosMatematicos = require('./calculo.js')

const gerarTabuadaWhile = function (tabuada) {
    let tab = Number(tabuada)
    let cont = 0
    let resultado


    //Primeiro faz o processamento e depois implementa o Loop(Repetição)
    while (cont <= 10) {
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + ' x ' + cont + ' = ' + resultado)
        //Incremento assim:
        cont = cont + 1;
        //ou 
        //cont++
        //ou 
        //cont+=1
    }
}

//O for tenta resolver tudo de uma vez só
const gerarTabuadaFor = function (tabuada) {
    let tab = Number(tabuada)
    let resultado


    //Primeiro faz o processamento e depois implementa o Loop(Repetição)
    for (let cont = 0; cont <= 10; cont++) {
            //Processamento
            resultado = calculosMatematicos.multiplicar(tab, cont)
            console.log(tab + ' x ' + cont + ' = ' + resultado)
        }
    }

gerarTabuadaFor(3)