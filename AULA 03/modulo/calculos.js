/*****************************************************************************
 * Objetivo: Arquivo responsável pelas funções de cálculos financeiros
 * Autor: Francisco Wala
 * Data: 11/02/26
 * Versão: 1.0
 ******************************************************************************/

//Função para retornar o percentual de um número
function calcularPercentual (numero){

    let numeroPercentual = Number(numero)
    //Validação de entrada vazia, menor ou igual a zero e de caractere
    if(numero == '' || numero <= 0 || isNaN(numero )){
        return false
    }else{

        //Calcula o percentual do numero
        let percentual = numeroPercentual / 100

        return Number(percentual.toFixed(2))
    }   
}

//Função para retornar o montante referente a juros compostos
function calcularJurosCompostos(valor,taxa, parcelas ){
    //Recebe os valores dos argumentos e converte em número
    let valorPrincipal  = Number(valor)
    let taxaDeJuros     = Number(taxa)
    let qtdeParcelas    = Number(parcelas)

    //Validação de vazio, de caracteres e menor ou igual a 0 
    if(valor == '' || isNaN(valor) || valor <= 0 || parcelas <= 0 || parcelas == '' || isNaN(parcelas)){
        return false
    }else{
        //Chama a função para retornar o percentual da taxa
        let percentual = calcularPercentual(taxaDeJuros)

        if(percentual){
            //calculo
            let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
            return Number(montante.toFixed(2))
        }else{
            return false
        }
    }
}
//Tornando as funções publicas
module.exports = {
    calcularPercentual,
    calcularJurosCompostos
}