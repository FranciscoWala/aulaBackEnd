/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza calculo de mais de uma tabuada
 * com numeros escolhidos por usuario
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

const calcularTabuada = function (valor1, valor2, valor3, valor4) {
    const tabuadaInicial = Number(valor1)
    const tabuadaFinal = Number(valor2)
    const numeroInicial = Number(valor3)
    const numeroFinal = Number(valor4)

    if (!validarTabuada(valor1, valor2, valor3, valor4)) {
        return false
    }

    let tabuadaAtual = tabuadaInicial
    let multiplicadorSecundario = numeroInicial

    while (tabuadaAtual <= tabuadaFinal) {
        console.log(`Tabuada do [${tabuadaAtual}]`)
        /*
        Escrever o que precisa
        e quando precisa

        numeroInicial volte para o numero inicial, e não continuar somando
        quando minha tabuada finalizar
        */
        while (multiplicadorSecundario <= numeroFinal) {
            resultado = tabuadaAtual * multiplicadorSecundario
            console.log(`${tabuadaAtual} x ${multiplicadorSecundario} = ${resultado}`)
            multiplicadorSecundario++
        }
        tabuadaAtual++
        multiplicadorSecundario = numeroInicial
    }

}
function validarTabuada(valor1, valor2, valor3, valor4) {
    let tabuadaInicial = valor1
    let tabuadaFinal = valor2
    let numeroInicial = valor3
    let numeroFinal = valor4

    if (tabuadaInicial == '' || tabuadaFinal == '' || numeroInicial == '' || numeroFinal == '') {
        console.log('Nenhuma entrada de dados pode ficar vazia')
        return false
    }
    if (tabuadaInicial < 2 || tabuadaFinal > 100) {
        console.log('ERRO: A entrada da tabuada deverá ser entre 2 no mínimo e 100 no máximo')
        return false
    }
    if (numeroInicial < 1 || numeroFinal > 50) {
        console.log('O valor máximo calculado só pode ser entre 1(Mínimo) e 50(Máximo)')
        return false
    }
    return true
}
module.exports = {
    validarTabuada,
    calcularTabuada
}
