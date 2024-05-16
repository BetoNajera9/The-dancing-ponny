import { AuthController } from '../auth/auth.controller'
import { HandlerRouter } from '../core/http'

const router = new HandlerRouter()
const authController = new AuthController()

router.addRoute('POST', '/sign-up', authController.signUp.bind(authController))
router.addRoute('POST', '/login', authController.login.bind(authController))

export default router
