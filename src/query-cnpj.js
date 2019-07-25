exports.handler = async ({ method, params, body }) => {
	let state = 'ok'
	try {
		if (method !== 'POST')
			state = 'methodError'
		if (Object.keys(params).length !== 0)
			state = 'paramsError'
		if (state === 'ok') {
			state = 'ok'
		}
	} catch (error) {
		console.log(error)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}