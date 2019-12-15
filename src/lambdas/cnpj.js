const main = require('../templates/main')
const request = require('../templates/request')

// Retorna informações da Receita Federal para o CNPJ recebido

const cnpj = ({ body }) => request(body)

exports.handler = main(cnpj)