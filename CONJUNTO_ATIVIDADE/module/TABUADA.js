/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza calculo de mais de uma tabuada
 * com numeros escolhidos por usuario
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

const tabuada = function (valor1, valor2) {

    while (numero2 <= 0) {
        let numero1 = Number(valor1)
        let numero2 = Number(valor2)
        let resultado = numero1 * numero2
        console.log(resultado)
        numero2++
    }
}

tabuada(10, 10)