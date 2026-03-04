/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de média escolares
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/


/*
Se a média estiver entre 50 e 69, o aluno estará de exame, e neste
caso o sistema deverá solicitar a nota que o aluno teve no exame.

Para o aluno ser aprovado no exame, a nota do exame e a média
anterior precisa ficar acima de 60, assim o aluno estará aprovado
no exame.
*/
const calcularMedia = function(numero1, numero2, numero3, numero4){
    let nota1 = Number(numero1)
    let nota2 = Number(numero2)
    let nota3 = Number(numero3)
    let nota4 = Number(numero4)

    let media = (nota1 + nota2 + nota3 + nota4) / 4

    return media
}
function validarStatus(media){
    if(media > 70){
        return 'Aprovado'
    }else if(media < 50){
        return 'Reprovado'
    }else{
        return 'Preciso de mais dados para o status!'
    }
}

function validarExame (mediaExame){
    
    if(mediaExame>60 ){
        return 'Aprovado'
    }
    return 'Reprovado'

}
function calcularMediaExame (media,notaExame){

    let mediaFormatada = Number(media)
    let statusExame = Number(notaExame)
    let mediaExame = (mediaFormatada + statusExame) / 2

    return mediaExame
}
module.exports = {
    validarStatus,
    calcularMedia,
    validarExame,
    calcularMediaExame
}
