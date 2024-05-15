import { IncomingMessage, ServerResponse } from 'http'

import { handlerResponse } from '../../common/utils'
import { userRouter } from './user.route'
import { authRouter } from './auth.route'
import { responseHttp } from '../http'
import { envs } from '../../config'

/**
 * Routes are defined for the entire app
 *
 * @type {Record<string, any>}
 * @property {Function} notFound - The not found route controller.
 */
const routes: Record<string, any> = {
	'/': {
		GET: (_req: IncomingMessage, res: ServerResponse) => {
			handlerResponse(
				res,
				{
					ProjectName: 'The dancing ponny API',
					Server: envs.server || `http://localhost:${envs.port}`,
					Repository: 'https://github.com/BetoNajera9/The-dancing-ponny',
					Author: 'Roberto Mirón Nájera',
				},
				'⌨️ with ❤️ by [betonajera](https://github.com/BetoNajera9) 😊'
			)

		},
	},

	notFound: (_req: IncomingMessage, res: ServerResponse) => {
		responseHttp(res, {
			status: 404,
			data: { message: 'requested resource not found!' },
		})
	},

	...userRouter,
	...authRouter
}

export default routes
