let acrescimo = 8

//Import da biblioteca de calculos financeiros
let calculos = require('./modulo/calculos.js')

let percentual = calculos.calcularPercentual(acrescimo)
console.log(percentual)