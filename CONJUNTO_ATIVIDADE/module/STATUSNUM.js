/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza verificaçao de status de uma
 * range numérica(Ímpar ou par)
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/
// chamar a função: separarImparPar(valor1, valor2, operacao)

function separarEscolhaUsuario (valor1, valor2, escolhaOperacao){

    if (!validarEntradaImparPar(valor1,valor2) ){
        return false
    }

    const numeroInicial   = Number(valor1)
    const numeroFinal     = Number(valor2)
    if(escolhaOperacao == '1'){
        separarPares(numeroInicial, numeroFinal)
        separarImpares(numeroInicial, numeroFinal)
    }else if(escolhaOperacao == '2'){
        separarPares(numeroInicial, numeroFinal)
    } else if(escolhaOperacao == '3'){
        separarImpares(numeroInicial, numeroFinal)
    }else{
        console.log('ERRO: Opção não selecionada ou incorreta')
    }
}

function separarImpares(numeroInicial,numeroFinal){
    console.log('Lista de números Impares:')
    let qtdImpares      = 0
    while(numeroInicial <= numeroFinal){
        if(numeroInicial % 2 == 1){
            console.log(numeroInicial)
            qtdImpares ++ //1 + 0 + 1 
        }
        
        numeroInicial ++
    }
    console.log(`Qtde de números encontrados: ${qtdImpares} `)
}

function separarPares(numeroInicial, numeroFinal){
    console.log('Lista de números Pares:')
    let qtdPares        = 0
    while(numeroInicial <= numeroFinal){
        if(numeroInicial % 2 == 0){
            console.log(numeroInicial)
            qtdPares ++ //1 + 0 + 1 
        }
        
        numeroInicial ++
    }
    console.log(`Qtde de números encontrados: ${qtdPares} `)
}
//O número final deverá ser limitado a entrada de valores entre 100 até 1000;
function validarEntradaImparPar (valor1, valor2){
    //O número inicial deverá ser limitado a entrada de valores entre 0 até 500;
    if(valor1 < 0 || valor1 > 500){
        console.log('O número inicial deve ser entre 0 e 500')
        return false
    }
    //O número final deverá ser limitado a entrada de valores entre 100 até 1000;
    if(valor2 < 100 || valor2 > 1000){
        console.log('O número final deve estar entre 100 e 1000')
        return false
    }
    //O usuário deve obrigatoriamente digitar números nas duas entradas, assim não podem ficar vazias;
    if(valor1 == NaN || valor2 == NaN){
        console.log('Os valores devem ser numéricos')
        return false
    }
    /*
        valor1 = 10

        valor dele é 10
        ele é do tipo número

        'number' 'string'

        mas

        valor1 = 'batata'
        valor dele é 'batata'
        ele é do tipo string

        se valor 1 for do tipo número -> tá válido
        se valor 1 for do tipo string, boleano -> não é válido

        queremos que entre no if se atender a segunda condição
    
    */
    //Se o usuário digitar um número inicial MAIOR do que o final o sistema deve
    //impedir o cálculo e apresentar uma mensagem de erro para o usuário;
    if(valor1 > valor2){
        console.log('ERRO: O número inicial não pode ser maior que o número final')
        return false
    }
    //O sistema também deve impedir que o usuário digite dois números iguais em ambas as entradas;
    if(valor1 == valor2){
        console.log('Os números escolhidos não podem ser iguais')
        return false
    }
    return true
}
//separarImparPar(400,400)
module.exports = {
    separarEscolhaUsuario
}