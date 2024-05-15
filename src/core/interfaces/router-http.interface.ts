import { IncomingMessage, ServerResponse } from 'http'

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void

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
	path: RegExp

	/**
	 * The handler that will execute the request process
	 *
	 * @example AuthController.login
	 */
	handler: RouteHandler
}
