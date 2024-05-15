import http from 'http'

import { Logger } from './common/utils'
import { MongoLib } from './lib'
import { envs } from './config'

import Router from './router'

new MongoLib()

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		Router.handleRequest(req, res)
	}
)

const logger = new Logger('AppService')

server.listen(envs.port, () => {
	logger.log(`Server is running on port ${envs.port}`)
})
