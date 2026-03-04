/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos índice de massa
 * corporal
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

function calcularImc (peso, altura ) {

    let valorIMC = peso / (altura/100 * altura/100)
    return valorIMC
    
}

function statusImc(valorIMC) {

    if (valorIMC <= 18.5) {
        return 'Abaixo do peso'
    }else if (valorIMC > 18.5 && valorIMC <= 24.9){
        return 'Peso normal'
    }else if (valorIMC >= 25 && valorIMC <= 29.9 ){
        return 'Acima do peso (sobrepeso)'
    }else if(valorIMC >= 30 && valorIMC <= 34.9){
        return 'Obesidade I'
    }else if(valorIMC >= 35 && valorIMC < 40){
        return 'Obesidade II'
    }else{
        return 'obesidade III'
    }
    
}
//calcularImc(72,170)
statusImc(24.9)
module.exports = {
    statusImc,
    calcularImc
}