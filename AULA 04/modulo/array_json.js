/***************************************************************
 * Objetivo: Manipular dados em array e Json
 * Data: 05/03/2026
 * Autor: Francisco
 * Versão: 1.0
 ***************************************************************/

/*
    [] -> representa um objeto do tipo ARRAY
    {} -> representa um objeto do tipo JSON

    array - é um espaço na memória para armazenar dados sem a necessidade de criar outros objetos / Trabalha com indices(exemplo a baixo)
            Pode ter vários tipos dentro com os indices
        ex: let = 'José'
            let = 'Maria'
            let = 'João'
                indices     0       1       2
            let nomes = ['José', 'Maria', 'João']

    JSON - é um espaço na memória para armazenar dados com CHAVES e VALOR
        EX:
            let nome = 'José'
            let telefone = '11923562389'
            let email = 'jose@gmail.com'
            
                            Atributo
                            Chave   Valor    Chave      Valor       Chave       Valor
            let cliente = {"nome": "José" ,"telefone": "12345678", "email": "jose@gmail.com"}
*/
//Criando objetos do tipo ARRAY
const listaDeAlunos = ['José','Maria','Luiz','Antônio','Carlos']
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function(){
    //exibe o objeto ARRAY com seu conteúdo
    console.log(listaDeAlunos)

    //exibindo o tipo de dados de um indice
    console.log(typeof(listaDeAlunos[2]))

    //exibe o objeto ARRAY em formato de tabela, mostrando o índice e conteúdo
    console.table(listaDeAlunos)
    
    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    //Exibindo os dados de forma individual pelo índice
    console.log(`O nome do aluno é: ${listaDeAlunos[0]} `)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]} `)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]} `)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]} `)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]} `)

    //Usando o While
    console.log('****************EXEMPLO COM WHILE******************')
    let cont = 0 
    while(cont<listaDeAlunos.length){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]} `)
        cont++
    }
    //RETORNA A QUANTIDADE DE ITEMS EM UM ARRAY 
    console.log(`O tamanho deste ARRAY é : ` + listaDeAlunos.length)

    console.log('*******************MOSTRADO***********************')


    //exibindo usando for:
    console.log('****************EXEMPLO COM FOR*******************')
     
    for (let contador = 0 ; contador<5 ; contador++){
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]} `)
    }
    console.log('*******************MOSTRADO***********************')

    //exibindo com FOR EACH
    //ELE NÂO FAZ REPETIÇÃO EM JSON
    //Só dá pra fazer em ARRAY
    console.log('****************EXEMPLO COM FOR EACH***************')
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é: ${[aluno]} `)
    })
    console.log('********************MOSTRADO************************')

    //Usando o FOR OF
    console.log('*****************EXEMPLO COM FOR OF*****************')
    for (aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno} `)
    }
    console.log('********************MOSTRADO************************')
    
    //Usando FOR IN(ELE RETORNA O ÍNDICE)
    console.log('*****************EXEMPLO COM FOR IN*****************')

    for (item in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[item]} `)
    }
    console.log('********************MOSTRADO************************')

}

const manipularDados = function(){
    //Adicionando elementos de forma manual 
    listaDeClientes[0] = 'José da Silva'
    listaDeClientes[1] = 'Maria da Silva'
    listaDeClientes[2] = 'Luiz da Silva'
    listaDeClientes[3] = 'Ana da Silva'
    listaDeClientes[5] = 'Beatriz da Silva'
    
    console.table(listaDeClientes)
    console.log(listaDeClientes)
    


    //Permite adicionar novos elemntos no ARRAY sempre no final
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo','Maria', 'José', 'André')
    
    console.table(listaDeFornecedores)
    console.log(listaDeFornecedores)

}

//exibirDados()
manipularDados()