require('dotenv').config()
const get = require('axios').get

exports.handler = async ({ method, params, body }) => {
	let state = 'ok'
	let responseBody = ''
	try {
		if (method !== 'POST')
			state = 'methodError'
		if (Object.keys(params).length !== 0)
			state = 'paramsError'
		if (state === 'ok') {
			responseBody = await get(`${process.env.API}${'19.736.609/0001-51'}${process.env.TOKEN}`)
		}
	} catch (error) {
		console.log(error)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state, responseBody)
}