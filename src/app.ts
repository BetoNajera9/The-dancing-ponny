import http from 'http'

import { handlerRequest } from './core/http'
import { Logger } from './common/utils'
import { MongoLib } from './lib'
import { envs } from './config'

const logger = new Logger('AppService')

new MongoLib()

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		handlerRequest(req, res)
	}
)

server.listen(envs.port, () => {
	logger.log(`Server is running on port ${envs.port}`)
})
