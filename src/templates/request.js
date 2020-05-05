const axios = require('axios')

const request = async (method, { cnpj, ignore_db = false }) => {
	const url = ignore_db
		? `${process.env.URL}${cnpj}${process.env.API_TOKEN}&ignore_db`
		: `${process.env.URL}${cnpj}${process.env.API_TOKEN}`
	const config = { url, method }
	try {
		const { data } = await axios(config)
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