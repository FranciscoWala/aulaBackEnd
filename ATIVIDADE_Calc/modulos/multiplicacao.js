
function multiplicacao(valor1,valor2){
    let n1 = valor1.replace(/,/g, ".")
    let n2 = valor2.replace(/,/g, ".")

    let multiplicacao = Number(n1) * Number(n2)

    return multiplicacao
}
module.exports = {
    multiplicacao
}