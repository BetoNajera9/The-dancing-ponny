import { Model } from 'mongoose'

import { ServiceException } from '../common/utils'
import { UserInterface } from './interfaces'
import { UserModel } from './user.model'

export class UserService {
	private userModel: Model<UserInterface>

	constructor() {
		this.userModel = UserModel
	}

	async createUser(userInterface: UserInterface): Promise<UserInterface> {
		const user = new UserModel(userInterface)

		await user.save()

		return user
	}

	async getUserByNickName(nickName: string): Promise<UserInterface | null> {
		const user = await this.userModel.findOne<UserInterface>({ nickName })

		if (!user)
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found user',
				code: 404,
			})

		return user
	}

	async getAllUsers(): Promise<UserInterface[]> {
		return await this.userModel.find<UserInterface>()
	}
}
