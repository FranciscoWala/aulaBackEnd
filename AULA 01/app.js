//Comentário em linha
/*  
    Comentário 
        em 
    bloco
*/
//Permite exibir um conteúdo no terminal
console.log('Testando JS')

//Permite a criação de uma variável 
var nome = 'Francisco'

console.log (nome)
//Concatenação de dados (texto e variável)
console.log('O nome do usuário é: ' + nome)
//Concatenação com $ e crase
console.log(`O nome do usuário é: ${nome}`)

//Import da biblioteca do readline
//readline -> serve para permitir a entrada de dados via terminal
var readline = require('readline')

//Cria um objeto especialista em entrada de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


//Permite a entrada de dados do nome do usuario
//question -> utiliza a fubção de CALLBACK para devolver o valor digitado
//CALLBACK -> É uma função particular de um método, que é chamada para
// encaminhar um conteúdo para o desenvolvedor, esse conteúdo vem através
// da variável no argumento "nomeUsuario"
entradaDeDados.question('Digite seu nome: ',function(nomeUsuario){
    console.log('O nome digitado foi: ' + nomeUsuario)

    entradaDeDados.question('Digite seu email: ',function(emailUsuario){
        console.log(`O email do usuário ${nomeUsuario} é ${emailUsuario}`)
    })
})