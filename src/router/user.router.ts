import { UserController } from '../user/user.controller'
import { HandlerRouter } from '../core/http'

const router = new HandlerRouter()
const userController = new UserController()

router.addRoute('GET', '/user', userController.getUsers.bind(userController))

export default router
