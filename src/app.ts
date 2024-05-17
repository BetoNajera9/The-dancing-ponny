import http from 'http'

import { RateLimiter } from './common/middlewares'
import { Logger } from './common/utils'
import { MongoLib } from './lib'
import { envs } from './config'

import Router from './router'

new MongoLib()

const rateLimiter = new RateLimiter(100, 60 * 60 * 1000)

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		if (rateLimiter.check(req, res)) Router.handleRequest(req, res)
	}
)

const logger = new Logger('AppService')

server.listen(envs.port, () => {
	logger.log(`Server is running on port ${envs.port}`)
})
