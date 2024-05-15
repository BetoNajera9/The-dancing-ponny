import { IncomingMessage, ServerResponse } from 'http'

import { RouteHandler, RouterHttpInterface } from '../interfaces'
import { responseHttp } from './response.http'
import { Logger } from '../../common/utils'

export class HandlerRouter {
	private routes: RouterHttpInterface[] = []
	private logger = new Logger('HandlerRouter')

	public addRoute(method: string, path: string, handler: RouteHandler): void {
		const pathRegex = new RegExp(`^${path.replace(/:[^/]+/g, '([^/]+)')}`)
		method = method.toUpperCase()

		this.routes.push({ method, path: pathRegex, handler })

		this.logger.log(`${method} ~ ${path}`)
	}

	public get getRoutes(): RouterHttpInterface[] {
		return this.routes
	}

	public addRoutes(routes: RouterHttpInterface[]) {
		this.routes = [...this.routes, ...routes]
	}

	public handleRequest(req: IncomingMessage, res: ServerResponse): void {
		const path = req.url ?? '/'
		const method = req.method.toUpperCase()

		const requestedRoute = this.routes.find(
			(route) => route.path.test(path) && method === route.method
		)

		if (requestedRoute) requestedRoute.handler(req, res)
		else
			responseHttp(res, {
				status: 404,
				data: {
					message: 'Requested resource not found!',
					path,
				},
			})
	}
}
