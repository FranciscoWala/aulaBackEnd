
function soma(valor1,valor2){
    let n1 = valor1.replace(/,/g, ".")
    let n2 = valor2.replace(/,/g, ".")
    
    let soma = Number(n1) + Number(n2)
    return soma
}


module.exports = {
    soma
}