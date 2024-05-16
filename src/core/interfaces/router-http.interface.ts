import { ServerResponse } from 'http'

import { RequestHttpInterface } from './request-http.interface'

export type RouteHandler = (
	req: RequestHttpInterface,
	res: ServerResponse
) => void

export interface RouterHttpInterface {
	/**
	 * Method http of the request
	 *
	 * @example GET
	 */
	method: string

	/**
	 * Route regex replacing params
	 *
	 * @example \/user\/:[^/]+
	 */
	originalPath: string

	/**
	 * Route regex replacing params
	 *
	 * @example \/user\/:[^/]+
	 */
	regExpPath: RegExp

	/**
	 * The handler that will execute the request process
	 *
	 * @example AuthController.login
	 */
	handler: RouteHandler
}
