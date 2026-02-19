/************************************************************************************************************************************
 *Objetivo: Projeto para realizar cálculo de médias escolares  
 * Autor: Francisco Wala 
 * Data: 29/01/2026
 * Versão: 1.0
 ************************************************************************************************************************************/

 /*
    Tipos de criações de variáveis

    var --> Nasceu com JS, permite criar um espaço em memória, do tipo variável
            Essa forma de criação hoje é consideradamais antiga,
            é provável que seja encontrada apenas em projetos
            mais antigos
            Dica: Caso você precise utilizar o var, recomenda-se 
            que seja utilizado apenas em escopo global(objeto que utiliza-se dentro de todas as funções(escopo global), as que criam dentro de bloco, são locais( { assim } )).

    let --> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é realizada somente no escopo local, ou seja, dentro de bloco de programação { função, if, loop }
            esse tipo de variável deixa de existir ao término do bloco.

    const --> Sem alteração, não devo mexer, não posso mudar; ex: const PI = 3,141592
              Permite criar um espaço em memória do tipo constante,
              ou seja, esse conteúdo não poderá sofrer mudanças durante 
              o projeto.
              Dica: Se possível, você pode criar essa const em MAIÚSCULO para facilitar a sua utilização. Pode ser criada
              de forma local ou global.

    Operadores de comparação
            ==  ->Permite a comparação de dois conteúdos
            !=  ->Permite compararar a diferença de dois conteúdos
            <   ->Permite validar o valor menor
            <=  ->Permite validar o valor maior
            >=  ->Permite validar se o valor é maior ou igual
            <=  ->Permite validar se o valor é menor ou igual
            === ->Permite comparar a igualdade dos conteúdos e a igualdade da tipagem de dados
            !== ->Permite comparar a diferença de conteúdos e a igualdade de tipagem de dados
            ==! ->Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados
    Tipos de operadores lógicos
            E -> AND -> &&
            OU -> OR -> ||
            NAO -> NOT -> ! 
    Formas de conversão de tipos de dados
        parseInt() => Permite converter um conteúdo em numero do tipo INTEIRO
        parseFloat() => Permite converter um conteúdo em numero do tipo DECIMAL
        Number() -> Permite converter um conteúdo para NUMERO, podendo ser inteiro ou decimal
        String() -> Permite converter um conteudo em STRING
        Boolean() -> Permite converter um conteudo para BOOLEANO (True or(||) false) 
        typeof(variável) -> Retorna o tipo de dados da variável
        (String, Number, Boolean ou Object)
    Objetos para Javascript:
        {} -> Objeto do tipo Json -> gera colunas
        [] -> Objeto do tipo Array -> gera linha
 */

const refatoracao = require('./modulo/refatoracao.js')
const status = require('./modulo/refatoracao.js')

// Import da biblioteca de entrada de dados
const readline = require('readline')

//Criação do objeto para captar as entradas de dados
const entradaDeDados = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})

//Entrada de dados do nome
entradaDeDados.question('Digite o nome do aluno: ', function(nome){
    // Recebe o nome do aluno
    let nomeAluno = nome

    // Entrada de dados da nota 1
    entradaDeDados.question('Digite a nota 1: ', function(valor1){
        let nota1 = valor1
        
        // Entrada de dados da nota 2
        entradaDeDados.question('Digite a nota 2: ', function(valor2){
            let nota2 = valor2

            // Entrada de dados da nota 3
            entradaDeDados.question('Digite a note 3: ', function(valor3){
                let nota3 = valor3

                    // Entrada de dados da nota 4
                    entradaDeDados.question('Digite a nota 4: ', function(valor4){
                        let nota4 = valor4

                            
                            // //Tratamento de erros
                            // // Validação de entrada vazia
                            // if (){
                            //     console.log('ERRO: Existem campos obrigatórios que não foram preenchidos !!!')
                            //     // Validação de entrada de números entre 0 e 100
                            // } else if (
                                
                            // ){ 
                                
                            //     // Validação de entrada somente de números
                            //     // isNAN -> Permite validação de oq é numero ou letra -> True || false
                            // }else if( isNaN(nota1) || isNaN(nota2) || isNaN(nota3)|| isNaN(nota4)){
                            //     console.log('ERRO: Somente números são permitidos na entrada de dados')
                            // } else {
                            //Criando objeto para utilizar biblioteca criada em outro arquivo
                            let media = refatoracao.calcularMedia(nota1, nota2, nota3,nota4)
                            let status
                            
                            //exibir boletim
                            //toFixed(quantidade de casas que deseja ser mostrado) -> é um metodo que permite fixar a qtde de casas decimais
                            console.log(`ALUNO: ${nomeAluno} \nMÉDIA FINAL: ${media} \nSTATUS DE APROVAÇÃO: ${statusAluno}`)
                    })//Chave fecha nota 1

                })//Chave fecha nota 4

            })//Chave fecha nota 3

        })//Chave fecha nota 2

    })//Chave fecha nome
