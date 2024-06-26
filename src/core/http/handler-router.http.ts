import { IncomingMessage, ServerResponse } from 'http'
import url from 'url'

import { handlerBody } from './handler-body.http'
import { responseHttp } from './response.http'
import { Logger } from '../../common/utils'
import {
	RequestHttpInterface,
	RouterHttpInterface,
	RouteHandler,
} from '../interfaces'

export class HandlerRouter {
	private routes: RouterHttpInterface[] = []
	private logger = new Logger('HandlerRouter')

	/**
	 * The RouterHttpInterface object is generated by adding the api route.
	 *
	 * @param  {string} method
	 * @param  {string} path
	 * @param  {RouteHandler} handler
	 * @returns void
	 */
	public addRoute(method: string, path: string, handler: RouteHandler): void {
		const pathRegex = new RegExp(`^${path.replace(/:[^/]+/g, '([^/]+)')}$`)
		method = method.toUpperCase()

		this.routes.push({
			method,
			originalPath: path,
			regExpPath: pathRegex,
			handler,
		})

		this.logger.log(`${method} ~ ${path}`)
	}

	/**
	 * Gets the RouterHttpInterface object containing all routes
	 *
	 * @returns RouterHttpInterface
	 */
	public get getRoutes(): RouterHttpInterface[] {
		return this.routes
	}

	/**
	 * Add routes in RouterHttpInterface
	 *
	 * @param  {RouterHttpInterface[]} routes
	 */
	public addRoutes(routes: RouterHttpInterface[]) {
		this.routes = [...this.routes, ...routes]
	}

	/**
	 * The url is obtained and validated if there is a match with the paths to execute the controllers.
	 *
	 * @param  {IncomingMessage} req
	 * @param  {ServerResponse} res
	 * @returns Promise<void>
	 */
	public async handleRequest(
		req: IncomingMessage,
		res: ServerResponse
	): Promise<void> {
		const request = {
			...req,
			headers: req.headers,
			query: {},
		} as RequestHttpInterface

		const parsedUrl = url.parse(req.url ?? '/', true)
		const method = req.method?.toUpperCase()
		const path = parsedUrl.pathname ?? '/'

		const requestedRoute = this.routes.find(
			(route) => route.regExpPath.test(path) && method === route.method
		)

		if (requestedRoute) {
			// Set queries
			for (const key in parsedUrl.query)
				request.query[key] = parsedUrl.query[key]

			// Set params
			if (requestedRoute.originalPath.includes(':')) {
				const paramsKeys =
					requestedRoute.originalPath
						.match(/:[^/]+/g)
						?.map((key) => key.substring(1)) || []
				const dynamicParams =
					requestedRoute.regExpPath.exec(path)?.slice(1) || []

				request.params = dynamicParams?.reduce(
					(object, name, index) => ({ ...object, [paramsKeys[index]]: name }),
					{}
				)
			}

			//Set body
			request.body = await handlerBody(req)

			requestedRoute.handler(request, res)
		} else
			responseHttp(res, {
				status: 404,
				data: {
					message: 'Requested resource not found!',
					path,
				},
			})
	}
}
