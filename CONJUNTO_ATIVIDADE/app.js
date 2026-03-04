/**************************************************************************
 * Objetivo: Criar um arquivo que neste momento apenas manipula os 
 * demais arquivos
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/
const STATUSNUMBER = require('./module/STATUSNUM')
const MEDIA = require('./module/MEDIA')
const FATORIAL = require('./module/FATORIAL')
const TABUADA = require('./module/TABUADA')
const IMC = require ('./module/IMC')

const readline = require('readline')
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(
`   Qual operação gostaria de utilizar(Digite um número)?
    1 - Impar ou par: 
    2 - Média escolar: 
    3 - Fatorial: 
    4 - Tabuada: 
    5 - IMC:
    `
    , function (escolhaOperacao) {
        if (escolhaOperacao == '1') {
            entradaDeDados.question('Digite o número inicial: ', function (valor1) {
                let escolhaDoUsuario = Number(valor1)
                entradaDeDados.question('Certo, agora digite o número final:', function (valor2) {
                    let escolhaDoUsuario2 = Number(valor2)
                    entradaDeDados.question(`
                    Digite a escolha desejada de separação:
                    1 - Pares e ímpares
                    2 - Apenas pares
                    3 - Apenas ímpares
                    `, function (operacao) {
                        let escolhaUsuario3 = operacao
                        STATUSNUMBER.separarEscolhaUsuario(escolhaDoUsuario, escolhaDoUsuario2, escolhaUsuario3)
                        entradaDeDados.close()
                    })


                })
            })
        }else if (escolhaOperacao == '2') {
            entradaDeDados.question('Digite o nome do(a) aluno(a): ', function (nomeAluno) {
                //let
                entradaDeDados.question('Digite o(a) nome do(a) professor(a): ', function (nomeProfessor) {
                    //let
                    entradaDeDados.question('Digite o sexo do(a) aluno(a): ', function (sexoAluno) {
                        //let
                        entradaDeDados.question('Digite o sexo do(a) professor(a): ', function (sexoProfessor) {
                            //let
                            entradaDeDados.question('Digite o nome do curso: ', function (curso) {
                                //let
                                entradaDeDados.question('Digite o nome da disciplina: ', function (disciplina) {
                                    //let
                                    entradaDeDados.question('Digite a primeira nota: ', function (nota1) {
                                        //let 
                                        entradaDeDados.question('Digite a segunda nota: ', function (nota2) {
                                            //let
                                            entradaDeDados.question('Digite a terceira nota: ', function (nota3) {
                                                //let
                                                entradaDeDados.question('Digite a quarta nota: ', function (nota4) {
                                                    //let
                                                    let media = MEDIA.calcularMedia(nota1, nota2, nota3, nota4)
                                                    let situacao = MEDIA.validarStatus(media)
                                                    if (situacao == 'Aprovado' || situacao == 'Reprovado') {
                                                        let situacaoFormatadaFeminino = 'reprovada'
                                                        let situacaoFormatadaMasculino = 'reprovado'
                                                        if (situacao == 'Aprovado') {
                                                            situacaoFormatadaFeminino = 'aprovada'
                                                            situacaoFormatadaMasculino = 'aprovado'
                                                        }
                                                        let situacaoAlunoDisciplina = `A aluna ${nomeAluno} foi ${situacaoFormatadaFeminino} na disciplina ${disciplina}.`
                                                        let notasAluno = `Notas do aluna: ${nota1}, ${nota2}, ${nota3}, ${nota4}.`
                                                        let definirSexoProfessor = `Professora: ${nomeProfessor}`

                                                        if (sexoAluno == 'Masculino') {
                                                            situacaoAlunoDisciplina = `O aluno ${nomeAluno} foi ${situacaoFormatadaMasculino} na disciplina ${disciplina}.`
                                                            notasAluno = `Notas do aluno: ${nota1}, ${nota2}, ${nota3}, ${nota4}.`
                                                        }

                                                        if (sexoProfessor == 'Masculino') {
                                                            definirSexoProfessor = `Professor: ${nomeProfessor} `
                                                        }

                                                        console.log(
                                                            `${situacaoAlunoDisciplina}
                                                            Curso: ${curso}
                                                            ${definirSexoProfessor}
                                                            ${notasAluno}
                                                            Média Final: ${media}
                                                        `)
                                                    } else {
                                                        entradaDeDados.question('Digite a nota do exame: ', function (notaExame) {
                                                            //let
                                                            let mediaExame = MEDIA.calcularMediaExame(media, notaExame)
                                                            let situacaoExame = MEDIA.validarExame(mediaExame)

                                                            let situacaoFormatadaFeminino = 'reprovada'
                                                            let situacaoFormatadaMasculino = 'reprovado'

                                                            if (situacaoExame == 'Aprovado') {
                                                                situacaoFormatadaFeminino = 'aprovada'
                                                                situacaoFormatadaMasculino = 'aprovado'
                                                            }
                                                            let situacaoAlunoDisciplina = `A aluna ${nomeAluno} foi ${situacaoFormatadaFeminino} na disciplina ${disciplina}.`
                                                            let notasAluno = `Notas do aluna: ${nota1}, ${nota2}, ${nota3}, ${nota4}, ${notaExame}`
                                                            let definirSexoProfessor = `Professora: ${nomeProfessor}`

                                                            if (sexoAluno == 'masculino' || sexoAluno == 'Masculino') {
                                                                situacaoAlunoDisciplina = `O aluno ${nomeAluno} foi ${situacaoFormatadaMasculino} na disciplina ${disciplina}.`
                                                                notasAluno = `Notas do aluno: ${nota1}, ${nota2}, ${nota3}, ${nota4}.`
                                                            }

                                                            if (sexoProfessor == 'masculino' || sexoProfessor == 'Masculino') {
                                                                definirSexoProfessor = `Professor: ${nomeProfessor} `
                                                            }

                                                            console.log(
                                                                `   ${situacaoAlunoDisciplina}
                                                                    Curso: ${curso}
                                                                    ${definirSexoProfessor}
                                                                    ${notasAluno}
                                                                    Média Final: ${media}
                                                                    Média final do Exame: ${mediaExame}
                                                                `)

                                                        })
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })

                            })

                        })

                    })

                })

            })

        }else if(escolhaOperacao == '3'){
            entradaDeDados.question('Qual número desejado para a operação? ',function(fatorialEscolhido){
                let fatorialResolvido = FATORIAL.calcularFatorial(fatorialEscolhido)
                console.log(fatorialResolvido)
                entradaDeDados.close()
            })
        }else if(escolhaOperacao == '4'){
            entradaDeDados.question('Qual a tabuada inicial que deseja?',function(valor1){
                //let
                entradaDeDados.question('Certo! Qual o número para finalizar a tabuada?', function(valor2){
                    //let
                    entradaDeDados.question('Falta pouco, agora qual número multiplicador inicial?',function(valor3){
                        //let
                        entradaDeDados.question('Por fim, qual o multiplicador final?',function(valor4){
                            //let
                            TABUADA.calcularTabuada(valor1, valor2, valor3, valor4)
                            entradaDeDados.close()
                        })
                    })
                })
            })
        }else if (escolhaOperacao == '5'){
            entradaDeDados.question('Digite seu peso:',function(peso){
                //let
                entradaDeDados.question('Digite a altura desejada, para o cálculo: ', function(altura){
                    let mostrarImc = IMC.calcularImc(peso,altura)
                    let statusIMC = IMC.statusImc(mostrarImc)
                    console.log(statusIMC)
                    entradaDeDados.close()
                })
            })
        }
        else {
            console.log('Opção inválida')
            entradaDeDados.close()
        }
    })

