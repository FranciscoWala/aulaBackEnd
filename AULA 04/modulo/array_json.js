/***************************************************************
 * Objetivo: Manipular dados em array e Json
 * Data: 05/03/2026
 * Autor: Francisco
 * Versão: 1.0
 ***************************************************************/

/*
    [] -> representa um objeto do tipo ARRAY [LISTA]
    {} -> representa um objeto do tipo JSON {COLUNAS}

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
const listaDeAlunos         = ['José','Maria','Luiz','Antônio','Carlos']
const listaDeClientes       = []
const listaDeFornecedores   = []

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
    


    //Permite adicionar novos elemntos no ARRAY sempre no final da lista
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo','Maria', 'José', 'André')
    
    console.table(listaDeFornecedores)
    //Permite adicionar um novo elemento no ARRAY, sempre no início
    //Após adicionar o elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')
    console.table(listaDeFornecedores)


    console.table(listaDeFornecedores)
    //Permite adicionar novo elemento em uma determinada posição do ARRAY:
                        //Splice(indice, qtdDeElementos, 'Novo conteúdo')
    listaDeFornecedores.splice(3,0, 'Bernardo')
    console.table(listaDeFornecedores)


    console.table(listaDeFornecedores)
    //Permite remover um determinado conteudo com base no indice do elemento ARRAY
                        //splice(indice, qtde de elementos a ser removido)
    listaDeFornecedores.splice(6,1)
    console.table(listaDeFornecedores)

    //Permite remover o último elemento do ARRAY
    console.table(listaDeFornecedores)
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover o primeiro elemento do ARRAY
    //Após ele remover, irá reorganizar todos os elementos

    console.table(listaDeFornecedores)
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

function removerItem(nomeAluno){
    //IndexOf() -> Retorna o índice referente ao conteúdo que esta sendo pesquisado
    let indice = listaDeAlunos.indexOf(nomeAluno)
    listaDeAlunos.splice(indice,1)    
    
    // for (cont in listaDeAlunos){
    //     if(nomeAluno == listaDeAlunos[cont]){
    //         listaDeAlunos.splice(cont,1)
    //     }
    // }

    //Fazendo com WHILE:
    // let cont = 0
    // let qtd = listaDeAlunos.length

    // while(cont < qtd ){
    //     if(nomeAluno == listaDeAlunos[cont]){
    //         listaDeAlunos.splice(cont,1)
    //     }
    //     cont ++
    // }
}

const verificarItems = function(nomeAluno){
    //Verifica se o conteúdo existe dentro do ARRAY e retorna (TRUE/FALSE)
    return (listaDeAlunos.includes(nomeAluno))
}

const manipularDadosJSON = function(){
    //Crando um objeto JSON
    //Padrão CHAVE(Atributo) : "VALOR(Conteúdo)"
    //Sem acento, cidilha, e colocar underline para criar JSON
    //JSON não é lista e nem vetor(OU SEJA, NÃO TEM ÍNDICE)
    let aluno = {"id" : 1, "nome" : "Jose da Silva", "ra" : 123456 , "email" : "jose@gmail.com"}
    //exibe o objeto JSON, pode ser 'console.table' tbm
    console.log(aluno)
    //Para exibir apenas o conteúdo de um atributo
    console.log(aluno.nome)
    console.log(aluno.email)

    //Adiciona um novo atributo, no JSON já existente
    aluno.telefone = "011-96723428"
    aluno.data_nascimento = '10/05/2000'
    aluno.nota = null
    console.log(aluno)

    //Remove um atributo do JSON
    delete aluno.email
    console.log(aluno)

    //Para alterar um conteúdo em um atributo já existente
    aluno.ra = 123456789 
    console.log(aluno)
}

const cadastroDeProdutos = function(){
    let cont = 0
    let cores = [
                {"id" : "1 ", "cor" : "Branco"  , "hexa" : "#ffffff"}, //0
                {"id" : "2" , "cor" : "preto"   , "hexa" : "#000000"}, //1
                {"id" : "3" , "cor" : "azul" , "hexa" : "#0000ff"},    //2
                {"id" : "4" , "cor" : "amarelo"    , "hexa" : "#ffff00"},//3
                {"id" : "5" , "cor" : "rosa"    , "hexa" : "#ffb5c0"}   //4
                ]

                //Maneira do professor com forEach
                // cores.forEach(function(itemCor){
                //     console.log(itemCor.cor)
                // })
                //Minha maneira de mostrar, com contador
                // while(cont<cores.length){
                //     console.log(`cores: ${cores[cont].cor} `)
                //     cont++
                // }


    let marcas = [
                {"id" : "1" , "marca" : "Dell" ,        "tel": "1190000-0000" , "email": "marca@gmail.com"},//0
                {"id" : "2" , "marca" : "Asus",         "tel": "1190000-0000" , "email": "marca@gmail.com"},//1
                {"id" : "3" , "marca" : "AMD" ,         "tel": "1190000-0000" , "email": "marca@gmail.com"},//2
                {"id" : "4" , "marca" : "redragon" ,    "tel": "1190000-0000" , "email": "marca@gmail.com"},//3
                {"id" : "5" , "marca" : "Apple",        "tel": "1190000-0000" , "email": "marca@gmail.com"},//4
                {"id" : "6" , "marca" : "Microsoft" ,   "tel": "1190000-0000" , "email": "marca@gmail.com"} //5
                ]

    let produtos = [
        {   "id" : 1 , 
            "nome" : "Monitor" ,
            "descricao" : "Monitor de 27 Polegadas",
            "valor" : 1500,
            "qtde": 20,
            //Envio de todos os dados, para o front trabalhar, por que nesse caso é possível
            "cor" : [
                cores[0],
                cores[1]
            ],
            //Possibilidade de poder mais de um atributo(Nesse caso marca)
            "marca": [
                marcas[0].marca
            ]
        },
        {   "id" : 2 ,
            "nome": "teclado" ,
            "descricao" : "Teclado mecânico RGB",
            "valor" : 250,
            "qtde" : 500,
            "cor" : cores,
            "marca" : [
                marcas[2].marca,
                marcas[3].marca,
                marcas[4].marca
            ]
        },
        {   "id" : 3 ,
            "nome": "mouse" ,
            "descricao" : "mouse sem fio",
            "valor" : 80,
            "qtde" : 160,
            "cor" : [
                cores[1],
                cores[3],
                cores[4]
            ],
            "marca" : [
                marcas[1].marca,
                marcas[2].marca,
                marcas[3].marca,
                marcas[5].marca
            ]
        }
    ]
// console.log(produtos)
// console.table(produtos)
// console.log(produtos[0].cor)
// console.log(produtos)
// console.log(produtos)
// console.table(produtos)
//Exibindo todas as cores referente ao produto "MONITOR"
// produtos[0].cor.forEach(function(itemCor){
//     console.log(itemCor.cor)
// })




produtos.forEach(function(relatorio){
    let corEscolhida = ''
    relatorio.cor.forEach(function(itemCor){
        console.log(itemCor.cor)
        corEscolhida = corEscolhida + itemCor.cor + "\n"
        })
    

    console.log(`
Produto: ${relatorio.nome},
Quantidade: ${relatorio.qtde},
valor: ${relatorio.valor},
cor: ${corEscolhida},
Marca:${relatorio.marca}
`)


})

// console.table(cores)
//METE UM CONSOLE LOG E VEJA OS S´´IMBOLOS, SE FOR JSON PONTO E O NOME DO ATRIBUTO
}

//exibirDados()
//manipularDados()
//console.log(verificarItems('Luciano'))
//removerItem('Antônio')
//manipularDadosJSON()
cadastroDeProdutos()