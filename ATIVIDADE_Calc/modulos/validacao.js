const operacao2 = require('./divisao')
const operacao4 = require('./multiplicacao')
const operacao1 = require('./soma')
const operacao3 = require('./subtracao')

function validarEscolha (escolhaDoUsuario, n1, n2){
    
    let escolha = formatarEscolhaDoUsuario(escolhaDoUsuario)

    if(escolha == 'soma'){
        return operacao1.soma(n1,n2)
    }else if(escolha == 'divisao'){
        return operacao2.divisao(n1,n2)
    }else if(escolha == 'multiplicacao'){
        return operacao4.multiplicacao(n1,n2)
    }else if(escolha == 'subtracao'){
        return operacao3.subtracao(n1,n2)
    }else {
        return false
    }
}


function validarEntrada (escolhaDoUsuario, n1, n2){
    let operacaoDefinida = escolhaDoUsuario
    let valor1 = n1
    let valor2 = n2

    if (!isNaN(operacaoDefinida) || operacaoDefinida =='' || valor1 == '' || valor2 == '' || isNaN(valor1) || isNaN(valor2)){
        return false
    }else{
        return validarEscolha(operacaoDefinida, valor1, valor2)
    }
}

function formatarEscolhaDoUsuario (escolhaDoUsuario){

    let semAcentos = escolhaDoUsuario.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    return semAcentos
}

module.exports = {
    validarEscolha,
    validarEntrada,
    formatarEscolhaDoUsuario
}