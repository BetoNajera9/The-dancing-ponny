import { Model } from 'mongoose'

import { DataMetaInterface, PaginationInterface } from '../common/interfaces'
import { handlerMeta, ServiceException } from '../common/utils'
import { DishInterface, RateInterface } from './interfaces'
import { UserInterface } from '../user/interfaces'
import { UserService } from '../user/user.service'
import { DishModel } from './dish.model'

export class DishService {
	private dishModel: Model<DishInterface>
	private userService: UserService
	private blackList = ['smeagol']

	constructor() {
		this.dishModel = DishModel
		this.userService = new UserService()
	}

	/**
	 * @param  {DishInterface} dishInterface
	 * @returns Promise<DishInterface>
	 */
	async createDish(dishInterface: DishInterface): Promise<DishInterface> {
		const dish = new DishModel(dishInterface)

		await dish.save()

		return dish
	}

	/**
	 * @param  {} {page
	 * @param  {PaginationInterface} take}
	 * @param  {string} search
	 * @returns Promise<DataMetaInterface<DishInterface[]>>
	 */
	async getAllDishes(
		{ page, take }: PaginationInterface,
		search: string
	): Promise<DataMetaInterface<DishInterface[]>> {
		const dishes = await this.dishModel
			.find<DishInterface>({ name: { $regex: search, $options: 'i' } })
			.skip((page - 1) * take)
			.limit(take)

		const count = await this.dishModel.countDocuments({
			name: { $regex: search, $options: 'i' },
		})
		const meta = handlerMeta({ page, take }, count)

		return { data: dishes, meta }
	}

	/**
	 * @param  {string} id
	 * @returns Promise<DishInterface>
	 */
	async getDishDetail(id: string): Promise<DishInterface> {
		const dish = await this.dishModel.findById<DishInterface>(id)

		if (!dish)
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found user',
				code: 404,
			})

		return dish
	}

	/**
	 * @param  {string} id
	 * @param  {DishInterface} dishInterface
	 * @returns Promise<DishInterface>
	 */
	async updateDish(
		id: string,
		dishInterface: DishInterface
	): Promise<DishInterface> {
		const dish = await this.dishModel.findByIdAndUpdate<DishInterface>(
			id,
			dishInterface
		)

		if (!dish)
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found user',
				code: 404,
			})

		return dish
	}

	/**
	 * @param  {string} id
	 * @returns Promise<DishInterface>
	 */
	async deleteDish(id: string): Promise<DishInterface> {
		const dish = await this.dishModel.findByIdAndDelete<DishInterface>(id)

		if (!dish)
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found user',
				code: 404,
			})

		return dish
	}

	/**
	 * @param  {string} dishId
	 * @param  {RateInterface} rateInterface
	 * @returns Promise<RateInterface>
	 */
	async rateDish(
		dishId: string,
		rateInterface: RateInterface
	): Promise<RateInterface> {
		const blackUsers = await Promise.all(
			this.blackList.map((user) => this.userService.getUserByNickName(user))
		)

		const userToRate = await this.userService.getUserById(rateInterface.userId)

		const userBlocked = blackUsers.find(
			(user: UserInterface) => user.nickName === userToRate.nickName
		)

		if (userBlocked)
			throw new ServiceException({
				name: 'BLOCK USER',
				message: `User ${userToRate.nickName} blocked for rating`,
				code: 403,
			})

		const dish = await this.dishModel.findById(dishId)

		if (!dish)
			throw new ServiceException({
				name: 'NOT FOUND',
				message: 'Not found dish',
				code: 404,
			})

		const rate = dish.rate.find(
			(element) => element.userId.toString() === rateInterface.userId
		)

		if (rate)
			throw new ServiceException({
				name: 'DUPLICATE RATE',
				message: 'There is already a rate of the dish',
				code: 409,
			})

		dish.rate.push(rateInterface)

		await dish.save()

		return rateInterface
	}
}
