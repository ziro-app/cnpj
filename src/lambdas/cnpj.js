const lambda = require('../templates/lambda')
const request = require('../templates/request')

// Retorna informações da Receita Federal para o CNPJ recebido
const cnpj = ({ body }) => request('get', body)

// export
const handler = lambda(cnpj)
module.exports = { handler }