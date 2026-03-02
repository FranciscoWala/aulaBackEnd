/**************************************************************************
 * Objetivo: Criar um arquivo que neste momento apenas manipula os 
 * demais arquivos
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/
const STATUSNUMBER = require('./module/STATUSNUM')
const MEDIA = require('./module/MEDIA')

const readline = require('readline')
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(
    `Qual operação gostaria de utilizar(Digite um número)?
    1 - Impar ou par: 
    2 - Média escolar: `
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
        } else if (escolhaOperacao == '2') {
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
                                                    if (situacao == 'Aprovado') {

                                                        let situacaoAlunoDisciplina = `A aluna ${nomeAluno} foi aprovada na disciplina ${disciplina}.`
                                                        let notasAluno = `Notas do aluna: ${nota1}, ${nota2}, ${nota3}, ${nota4}.`
                                                        let Professor

                                                        if (sexoAluno == 'masculino') {
                                                            situacaoAlunoDisciplina = `O aluno ${nomeAluno} foi aprovado na disciplina ${disciplina}.`
                                                            notasAluno = `Notas do aluno: ${nota1}, ${nota2}, ${nota3}, ${nota4}.`
                                                        }

                                                        if(sexoProfessor == 'masculino'){

                                                        }

                                                        console.log(
                                                            `O aluno ${nomeAluno} foi ${situacao} na disciplina ${disciplina}.
                                                            Curso: ${curso}
                                                            Professor(a): ${nomeProfessor}
                                                            Notas do aluno: ${nota1}, ${nota2}, ${nota3}, ${nota4}.
                                                            Média Final: ${media}
                                                        `)
                                                        console.log(
                                                            `A aluna ${nomeAluno} foi ${situacao} na disciplina ${disciplina}.
                                                            Curso: ${curso}
                                                            Professora: ${nomeProfessor}
                                                            Notas do aluna: ${nota1}, ${nota2}, ${nota3}, ${nota4}.
                                                            Média Final: ${media}
                                                        `)

                                                        console.log(`${fraseVariante} ns disciplins`)
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

        }

        else {
            console.log('Opção inválida')
            entradaDeDados.close()
        }
    })

