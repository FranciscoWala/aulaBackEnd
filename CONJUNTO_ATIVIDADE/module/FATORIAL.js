/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de fatorial
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/
function calcularFatorial(numeroFatorado) {
    let resultado = numeroFatorado
    let guardarNumeros = `${numeroFatorado}`
    let numeroAlterado = numeroFatorado

    if(!validarFatorial(numeroFatorado)){
        return false
    }

    /*
    Fatorial de 5

    1ª Repetição:
    resultado: 20
    guardarNumeros: '5 X 4'
    numeroAlterado: 4
    
    2ª Repetição:
    resultado: 60
    guardarNumeros: '5 X 4 X 3'
    numeroAlterado: 3

    3ª Repetição:
    resultado: 120
    guardarNumeros: '5 X 4 X 3 X 2'
    numeroAlterado: 2

    4ª Repetição:
    resultado: 120
    guardarNumeros: '5 X 4 X 3 X 1'
    numeroAlterado: 1

    5ª Repetição:
    resultado: 0
    guardarNumeros: '5 X 4 X 3 X 1 X 0'
    numeroAlterado: 0

    */

    while (numeroAlterado > 1) {
        numeroAlterado--
        resultado = resultado * numeroAlterado
        guardarNumeros += `x${numeroAlterado}`
    }
    return `Fatorial de ${numeroFatorado} é ${guardarNumeros} = ${resultado}`

}

function validarFatorial(numeroFatorado) {
    let numeroValidado = numeroFatorado
    if (numeroValidado === 0) {
        console.log('ERRO: Não é permitido fatorial de 0(ZERO)')
        return false
    }
    if (numeroValidado == 1) {
        console.log(`Não é possível calcular o fatorial, 
        precisa ser um número maior do que 1`)
        return false
    }
    if(typeof(numeroValidado) !='number'){
        console.log('Dados vazios ou não é um caracter válido')
        return false
    }
    return true
}
module.exports = {
    calcularFatorial,
    validarFatorial
}
