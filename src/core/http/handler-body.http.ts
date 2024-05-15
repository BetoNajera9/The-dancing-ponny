import { IncomingMessage } from 'http'

/**
Returns a promise that resolves with the parsed JSON data of the request body.
@param {import('http').IncomingMessage} req - The HTTP request object
@return {Promise} - A promise resolves with the parsed request body or rejects with an error
*/
export const handlerBody = <T>(req: IncomingMessage): Promise<T> => {
	return new Promise((resolve, reject) => {
		let body = ''

		req.on('data', (chunk) => {
			body += chunk
		})

		req.on('end', () => {
			try {
				body = body ? JSON.parse(body) : {}

				resolve(body as T)
			} catch (error) {
				reject(error)
			}
		})
	})
}
