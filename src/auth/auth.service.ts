import jwt from 'jsonwebtoken'
import * as Bcrypt from 'bcrypt'

import { UserService } from '../user/user.service'
import { UserInterface } from '../user/interfaces'
import { ServiceException } from '../common/utils'
import { UserTokenInterface } from './interfaces'
import { PayloadInterface } from './interfaces'
import { envs } from '../config'

export class AuthService {
	private readonly userService: UserService

	constructor() {
		this.userService = new UserService()
	}

	signToken(data: PayloadInterface) {
		return jwt.sign(data, envs.jwtSecret)
	}

	async login(nickName: string, password: string): Promise<UserTokenInterface> {
		const user = await this.userService.getUserByNickName(nickName)

		if (!Bcrypt.compareSync(password, user.password))
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found user',
			})

		const accessToken = this.signToken({ userId: user.id })

		return { user, accessToken }
	}

	async signUp(userInterface: UserInterface): Promise<UserTokenInterface> {
		userInterface.password = Bcrypt.hashSync(userInterface.password, 10)

		const user = await this.userService.createUser(userInterface)

		const accessToken = this.signToken({ userId: user.id })

		return { user, accessToken }
	}
}
