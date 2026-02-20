/***************************************************************************
 * Objetivo: Arquivo responsável pelo processamento por cálculos matemáticos
 * (SOMAR, DIVIDIR, MULTIPLICAR E SUBTRAIR)
 * Data: 20/02/2026
 * Autor: Francisco Wala
 * Versão: 1.0
 ***************************************************************************/

//toLowerCase retorna uma String em minusculo
//toUpperCase retorna uma String em maiusculo

//Exemplo de função anonima

//Função para calcular as 4 operações matemáticas
 const calcular = function(numero1, numero2, operador){
    //Entrada de dados
    let valor1               = Number(numero1)
    let valor2               = Number(numero2)
    let operadorMatematico   = String(operador).toUpperCase()

     let resultado = false
    // //Processamento
    // if(operadorMatematico == 'SOMAR')
    //     resultado = valor1 + valor2
    // else if(operadorMatematico == 'SUBTRAIR') 
    //     resultado = valor1 - valor2
    // else if(operadorMatematico == 'MULTIPLICAR')
    //     resultado = valor1 * valor2
    // else if (operadorMatematico == 'DIVIDIR')
    //     resultado = valor1 / valor2
    
    switch (operadorMatematico) {
        case 'SOMAR':
            resultado = valor1 + valor2
            break;
        case 'SUBTRAIR':
            resultado = valor1 - valor2
            break;
        case 'DIVIDIR':
            resultado = valor1 / valor2
            break;    
        case 'MULTIPLICAR':
            resultado = valor1 * valor2
            break;
    }

    //saída
    return resultado


 }
    //  //Saída tratando undefined
    //  if(resultado != undefined){
    //     return resultado
    // }else{
    //     return false
    // }


//Chamando a função para testar
let result = calcular(892, 666, 'MULTIPLICAR')

console.log(result)
// if (result){
//     console.log(result)
// }else{
//     console.log('ERRO')
// }