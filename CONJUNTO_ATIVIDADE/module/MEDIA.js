/**************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de média escolares
 * Autor: Francisco Wala
 * Data:25/02/26
 * Versão: 1.0
 ***************************************************************************/

const calcularMedia = function(numero1, numero2, numero3, numero4){
    let nota1 = Number(numero1)
    let nota2 = Number(numero2)
    let nota3 = Number(numero3)
    let nota4 = Number(numero4)

    let media = (nota1 + nota2 + nota3 + nota4) / 4

    console.log(media)

}
calcularMedia(10,20,30,40)