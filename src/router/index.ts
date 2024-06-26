import { IncomingMessage, ServerResponse } from 'http'

import { handlerResponse } from '../common/utils'
import { HandlerRouter } from '../core/http'
import { envs } from '../config'

import userRouter from './user.router'
import authRouter from './auth.router'
import dishRouter from './dish.router'

const routers = [userRouter, authRouter, dishRouter]

const router = new HandlerRouter()

routers.forEach((route: HandlerRouter) => {
	router.addRoutes(route.getRoutes)
})

router.addRoute('GET', '/', (_req: IncomingMessage, res: ServerResponse) => {
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
})

export default router
