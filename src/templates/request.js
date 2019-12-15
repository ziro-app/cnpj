const { get } = require('axios')
const URL = process.env.URL
const API_TOKEN = process.env.API_TOKEN

const request = async ({ cnpj }) => {
	try {
		const { data } = await get(`${URL}${cnpj}${API_TOKEN}`)
		return {
			statusCode: 200,
			body: JSON.stringify(data, null, 4)
		}
	} catch (error) {
		if (error.response && error.response.data && error.response.data.error) {
			const { status_code, message } = error.response.data.error
			throw { statusCode: status_code, body: message }
		} else {
			console.log('Unexpected error:', error)
			return {
				statusCode: 500,
				body: JSON.stringify('Internal error. Check logs', null, 4)
			}
		}
	}
}

module.exports = request