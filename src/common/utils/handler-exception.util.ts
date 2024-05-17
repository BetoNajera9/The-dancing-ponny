import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { ServerResponse } from 'http'
import { Error } from 'mongoose'

import { ResponseHttpInterface } from '../../core/interfaces'
import { ServiceException } from './service-exception.util'
import { ResponseInterface } from '../interfaces'
import { responseHttp } from '../../core/http'
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
		logger.error(exception.toString())
		logger.error(exception.moreInfo)
	} else if (
		exception instanceof JsonWebTokenError ||
		exception instanceof TokenExpiredError
	) {
		dataRespose.message = `Invalid access token`
		httpResponse.status = 401

		logger.error(exception.message)
	} else if (exception instanceof Error.CastError) {
		dataRespose.message = `${exception.value} is not a valid ObjectId`
		httpResponse.status = 400

		logger.error(dataRespose.message)
	} else if (exception.code === 11000) {
		const message = `Duplicate key ${JSON.stringify(exception.keyValue)}`

		dataRespose.message = message
		httpResponse.status = 400

		logger.error(message)
	}

	responseHttp<ResponseInterface<Object>>(res, httpResponse)
}
