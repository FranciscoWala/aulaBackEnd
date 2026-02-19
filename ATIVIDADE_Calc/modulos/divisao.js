function divisao(valor1,valor2){
    let n1 = valor1.replace(/,/g, ".")
    let n2 = valor2.replace(/,/g, ".")

    if (n1 <= 0 || n2 <= 0){
        return false
    }else{
        let divisao = Number(n1) / Number(n2)
        return Number(divisao.toFixed(2))
    }
}
module.exports = {
    divisao
}