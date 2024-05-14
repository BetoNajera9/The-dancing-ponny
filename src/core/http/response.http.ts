import { ServerResponse } from 'http'

import { ResponseHttpInterface } from '../interfaces'

/**
 * Sends a response to the client with the specified data, status code, and content type.
 *
 * @param {import('http').ServerResponse} res - The server response object.
 * @param {ResponseInterface<T>} options - The response options object.
 */

export const responseHttp = <T>(
	res: ServerResponse,
	{
		data,
		status = 200,
		contentType = 'application/json',
	}: ResponseHttpInterface<T>
): void => {
	res.writeHead(status, { 'Content-Type': contentType })
	res.write(JSON.stringify(data))
	res.end()
}
