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
 * @param  {ServiceException} exception
 * @returns void
 */
export const handlerException = (
  res: ServerResponse,
  exception: ServiceException
): void => {
  const logger = new Logger('HandlerException')

  const dataRespose: ResponseInterface<Object> = {
    success: false,
    message: exception.message,
  }

  const httpResponse: ResponseHttpInterface<ResponseInterface<Object>> = {
    status: exception.code,
    data: dataRespose,
  }

  logger.error(exception.toString)
  logger.error(exception.moreInfo)

  responseHttp<ResponseInterface<Object>>(res, httpResponse)
}
