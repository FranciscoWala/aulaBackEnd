function calcularMedia(nota1, nota2, nota3, nota4){

    if(nota1 < 0 || nota1 > 100 ||nota2< 0 || nota2 > 100 ||nota3 < 0 || nota3 > 100 
    ||nota4 < 0 || nota4 > 100 || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == ''
    || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)|| isNaN(nota4)
    ){
        return false
    }else{
        let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4))/4
        return Number(media.toFixed(2))
    }
}
function validarSituacao(){

}
module.exports = {
    calcularMedia,
    validarSituacao
}
