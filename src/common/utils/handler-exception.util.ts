import { ServerResponse } from 'http'

import { ResponseInterface } from '../interfaces/response.interface'
import { ResponseHttpInterface } from '../../core/interfaces'
import { responseHttp } from '../../core/http/response.http'
import { ServiceException } from './service-exception.util'
import { Logger } from './logger.utils'

/**
 * Gets the exception properties and creates a custom response and creates logs
 *
 * @param  {ServerResponse} res
 * @param  {ExceptionInterface} exception
 * @returns void
 */
export const handlerException = (res: ServerResponse, exception: any): void => {
	const logger = new Logger('HandlerException')

	const dataRespose: ResponseInterface<Object> = {
		success: false,
		message: exception.message,
	}

	const httpResponse: ResponseHttpInterface<ResponseInterface<Object>> = {
		status: exception.code,
		data: dataRespose,
	}

	if (exception instanceof ServiceException) {
		logger.error(exception.toString)
		logger.error(exception.moreInfo)
	} else if (exception.code === 11000) {
		const message = `Duplicate key ${JSON.stringify(exception.keyValue)}`

		dataRespose.message = message
		httpResponse.status = 400

		logger.error(message)
	}

	responseHttp<ResponseInterface<Object>>(res, httpResponse)
}
