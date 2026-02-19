const operacao2 = require('./divisao')
const operacao4 = require('./multiplicacao')
const operacao1 = require('./soma')
const operacao3 = require('./subtracao')

function validarEscolha (escolhaDoUsuario, n1, n2){
    
    if(escolhaDoUsuario == 'soma' || escolhaDoUsuario == 'SOMA' || escolhaDoUsuario == 'Soma' || escolhaDoUsuario == 'sOma' || escolhaDoUsuario == 'soMa' ){
        return operacao1.soma(n1,n2)
    }else if(escolhaDoUsuario == 'divisao' || escolhaDoUsuario =='divisão' || escolhaDoUsuario == 'divisâo' || escolhaDoUsuario =='Divisao' || escolhaDoUsuario == 'DIVISÃO' || escolhaDoUsuario == 'DIVISAO'){
        return operacao2.divisao(n1,n2)
    }else if(escolhaDoUsuario == 'multiplicacao' || escolhaDoUsuario == 'MULTIPLICAÇÃO' || escolhaDoUsuario == 'MULTIPLICACAO' || escolhaDoUsuario == 'Multiplicacão' || escolhaDoUsuario == 'multiplicação'){
        return operacao4.multiplicacao(n1,n2)
    }else if(escolhaDoUsuario == 'subtracao' || escolhaDoUsuario == 'SUBTRACAO' || escolhaDoUsuario == 'Subtração' || escolhaDoUsuario == 'subtração' || escolhaDoUsuario == 'subtracao'){
        return operacao3.subtracao(n1,n2)
    }else{
        return false
    }
}


function validarEntrada (escolhaDoUsuario, n1, n2){
    let operacaoDefinida = escolhaDoUsuario
    let valor1 = n1.replace(/,/g, ".", /([.,])\1/)
    let valor2 = n2.replace(/,/g, ".", /([.,])\1/)

    if (!isNaN(operacaoDefinida) || operacaoDefinida =='' || valor1 == '' || valor2 == '' || isNaN(valor1) || isNaN(valor2)){
        return false
    }else{
        return validarEscolha(operacaoDefinida, valor1, valor2)
    }
}

module.exports = {
    validarEscolha,
    validarEntrada
}