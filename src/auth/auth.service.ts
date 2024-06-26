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

	/**
	 * The jwt is created
	 *
	 * @param  {PayloadInterface} data
	 * @returns string
	 */
	signToken(data: PayloadInterface): string {
		return jwt.sign(data, envs.jwtSecret, { expiresIn: envs.jwtExpires })
	}

	/**
	 * A user is logged in and the input data is verified.
	 *
	 * @param  {string} nickName
	 * @param  {string} password
	 * @returns Promise<UserTokenInterface>
	 */
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

	/**
	 * A user is registered in the database.
	 *
	 * @param  {UserInterface} userInterface
	 * @returns Promise<UserTokenInterface>
	 */
	async signUp(userInterface: UserInterface): Promise<UserTokenInterface> {
		userInterface.password = Bcrypt.hashSync(userInterface.password, 10)

		const user = await this.userService.createUser(userInterface)

		const accessToken = this.signToken({ userId: user.id })

		return { user, accessToken }
	}
}
