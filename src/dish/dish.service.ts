import { Model } from 'mongoose'

import { handlerMeta, ServiceException } from '../common/utils'
import { DataMetaInterface, PaginationInterface } from '../common/interfaces'
import { DishInterface } from './interfaces'
import { DishModel } from './dish.model'

export class DishService {
	private dishModel: Model<DishInterface>

	constructor() {
		this.dishModel = DishModel
	}

	async createDish(dishInterface: DishInterface): Promise<DishInterface> {
		const dish = new DishModel(dishInterface)

		await dish.save()

		return dish
	}

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
}
