import { ServerResponse } from 'http'

import { ResponseInterface } from '../interfaces/response.interface'
import { ResponseHttpInterface } from '../../core/interfaces'
import { responseHttp } from '../../core/http'

/**
 * Gets the response properties and creates a customized response
 *
 * @param  {import('http').ServerResponse} res - The server response object
 * @param  {T} data - Service response data
 * @param  {string} message - Service response message
 * @param  {number} code - Http status of the service response
 * @returns void
 */
export const handlerResponse = <T>(
	res: ServerResponse,
	data: T,
	message: string,
	code: number = 200
): void => {
	const dataRespose: ResponseInterface<T> = {
		success: true,
		message,
		data,
	}

	const httpResponse: ResponseHttpInterface<ResponseInterface<T>> = {
		status: code,
		data: dataRespose,
	}

	responseHttp<ResponseInterface<T>>(res, httpResponse)
}
