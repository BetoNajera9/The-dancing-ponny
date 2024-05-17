import { ServerResponse } from 'http'

import { handlerException, handlerResponse } from '../common/utils'
import { RequestHttpInterface } from '../core/interfaces'
import { LoginSchema, SignUpSchema } from './schemas'
import { BodyValidator } from '../common/decorators'
import { UserInterface } from '../user/interfaces'
import { UserTokenInterface } from './interfaces'
import { AuthService } from './auth.service'

export class AuthController {
	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@BodyValidator(LoginSchema)
	async login(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const authService = new AuthService()

			const { nickName, password } = req.body

			const user = await authService.login(nickName, password)

			handlerResponse<UserTokenInterface>(res, user, 'Login seccessful')
		} catch (error) {
			handlerException(res, error)
		}
	}

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@BodyValidator(SignUpSchema)
	async signUp(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
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
