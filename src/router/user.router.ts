import { HandlerRouter } from '../core/http/handler-router.http'
import { UserController } from '../user/user.controller'

const router = new HandlerRouter()
const userController = new UserController()

router.addRoute('GET', '/user', userController.getUsers.bind(userController))

export default router
