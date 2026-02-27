/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza calculo de mais de uma tabuada
 * com numeros escolhidos por usuario
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

const tabuada = function (valor1, valor2) {
    let numero1 = valor1
    let numero2 = valor2
    while (valor2 <= 0) {
        let resultado = valor1 * valor2
        numero2++
        console.log(`${numero1} * ${numero2} = ${resultado}`)
    }
}

tabuada(10, 10)