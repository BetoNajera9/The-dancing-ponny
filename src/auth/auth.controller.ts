import { ServerResponse } from 'http'

import { handlerException, handlerResponse } from '../common/utils'
import { RequestHttpInterface } from '../core/interfaces'
import { BodyValidator } from '../common/decorators'
import { UserInterface } from '../user/interfaces'
import { UserTokenInterface } from './interfaces'
import { AuthService } from './auth.service'
import { LoginSchema } from './schemas'

export class AuthController {
	@BodyValidator(LoginSchema)
	async login(req: RequestHttpInterface, res: ServerResponse) {
		try {
			const authService = new AuthService()

			const { nickName, password } = req.body

			const user = await authService.login(nickName, password)

			handlerResponse<UserTokenInterface>(res, user, 'Login seccessful')
		} catch (error) {
			handlerException(res, error)
		}
	}

	@BodyValidator(LoginSchema)
	async signUp(req: RequestHttpInterface, res: ServerResponse) {
		try {
			const authService = new AuthService()

			const userInterface = {
				nickName: req.body.nickName,
				password: req.body.password,
			} as UserInterface

			const user = await authService.signUp(userInterface)

			handlerResponse<UserTokenInterface>(
				res,
				user,
				'User was created seccessful'
			)
		} catch (error) {
			handlerException(res, error)
		}
	}
}
