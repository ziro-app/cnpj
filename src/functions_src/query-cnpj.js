require('dotenv').config()
const get = require('axios').get
const URL = process.env.URL
const TOKEN = process.env.TOKEN
const response = require('../response')

exports.handler = async ({ httpMethod: http, queryStringParameters: params, body }) => {
	let state = 'ok'
	let apiResponse = ''
	try {
		if (http !== 'POST') state = 'methodError'
		if (Object.keys(params).length !== 0) state = 'paramsError'
		if (state === 'ok') {
			const { data } = await get(`${URL}${JSON.parse(body).cnpj}${TOKEN}`)
			apiResponse = data
		}
	} catch (error) {
		console.log(error)
		state = 'executionError'
	}
	return response(state, apiResponse)
}

// curl -d '{"cnpj": "21.964.855/0001-02"}' -X POST https://cnpj.ziro.app/.netlify/functions/query-cnpj
// curl -d '{"cnpj": "21.964.855/0001-02"}' -X POST http://localhost:9000/query-cnpj