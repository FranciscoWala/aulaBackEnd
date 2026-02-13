const operacao2 = require('../modulos/divisao')
const operacao4 = require('../modulos/multiplicacao')
const operacao1 = require('../modulos/soma')
const operacao3 = require('../modulos/subtracao')

function validarEscolha (escolhaDoUsuario, n1, n2){
    
    if(escolhaDoUsuario == 'soma' ){
        return operacao1.soma(n1,n2)
    }else if(escolhaDoUsuario == 'divisao'){
        return operacao2.divisao(n1,n2)
    }else if(escolhaDoUsuario == 'multiplicacao'){
        operacao4.multiplicacao
    }else if(escolhaDoUsuario == 'subtracao'){
        operacao3.subtracao
    }else{
        return false
    }
}
module.exports = {
    validarEscolha
}