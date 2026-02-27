const imc = require('./IMC')

function validarImc(valorIMC) {
    
    if (valorIMC <= 18.5) {
        console.log('Abaixo do peso')
    }else if (valorIMC > 18.5 && valorIMC <= 24.9){
        console.log('Peso normal')
    }else if (valorIMC >= 25 && valorIMC <= 29.9 ){
        console.log('Acima do peso (sobrepeso)')
    }else if(valorIMC >= 30 && valorIMC <= 34.9){
        console.log('Obesidade I')
    }else if(valorIMC >= 35 && valorIMC < 40){
        console.log('Obesidade II')
    }else{
        console.log('obesidade III')
    }
    console.log(valorIMC)
}
 validarImc(imc.calcularImc(95,154))

module.exports = {
    validarImc,
}