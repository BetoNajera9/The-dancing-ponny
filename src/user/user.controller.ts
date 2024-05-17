import { ServerResponse } from 'http'

import { handlerException, handlerResponse } from '../common/utils'
import { PaginationInterface } from '../common/interfaces'
import { RequestHttpInterface } from '../core/interfaces'
import { QueryValidator } from '../common/decorators'
import { PaginationSchema } from '../common/schemas'
import { UserService } from './user.service'
import { UserInterface } from './interfaces'

export class UserController {
	@QueryValidator([PaginationSchema])
	async getUsers(req: RequestHttpInterface, res: ServerResponse) {
		try {
			const pagination: PaginationInterface = {
				page: +req.query.page,
				take: +req.query.take,
			}

			const userService = new UserService()
			const users = await userService.getAllUsers(pagination)

			handlerResponse<UserInterface[]>(res, users, 'Users found successful')
		} catch (error) {
			handlerException(res, error)
		}
	}
}
