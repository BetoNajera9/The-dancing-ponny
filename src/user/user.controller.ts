import { ServerResponse } from 'http'

import { handlerException, handlerResponse } from '../common/utils'
import { RequestHttpInterface } from '../core/interfaces'
import { UserService } from './user.service'
import { UserInterface } from './interfaces'

export class UserController {
	private userService = new UserService()

	async getUsers(req: RequestHttpInterface, res: ServerResponse) {
		try {
			const users = await this.userService.getAllUsers()

			handlerResponse<UserInterface[]>(res, users, 'Users found successful')
		} catch (error) {
			handlerException(res, error)
		}
	}
}
