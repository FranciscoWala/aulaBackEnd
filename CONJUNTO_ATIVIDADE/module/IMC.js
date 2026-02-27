/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos índice de massa
 * corporal
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

function calcularImc (peso, altura ) {

    let alturaQuadrado = (Number(altura)/100 * Number(altura)/100)
    let imc = peso / alturaQuadrado
    return imc
    //console.log(imc)
}
module.exports = {
    calcularImc
}
