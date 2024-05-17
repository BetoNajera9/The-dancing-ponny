import { ServerResponse } from 'http'

import { BodyValidator, QueryValidator } from '../common/decorators'
import { handlerException, handlerResponse } from '../common/utils'
import { PaginationSchema, SearchSchema } from '../common/schemas'
import { CreateDishSchema, UpdateDishSchema } from './schemas'
import { PaginationInterface } from '../common/interfaces'
import { RequestHttpInterface } from '../core/interfaces'
import { DishService } from './dish.service'
import { DishInterface } from './interfaces'

export class DishController {
	@QueryValidator([PaginationSchema, SearchSchema])
	async getAll(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const pagination: PaginationInterface = {
				page: +req.query.page,
				take: +req.query.take,
			}

			const dishService = new DishService()
			const dishes = await dishService.getAllDishes(
				pagination,
				`${req.query.search}`
			)

			handlerResponse<DishInterface[]>(res, dishes, 'Get all dishes succesful')
		} catch (error) {
			handlerException(res, error)
		}
	}

	async getDishDetails(
		req: RequestHttpInterface,
		res: ServerResponse
	): Promise<void> {
		try {
			const dishService = new DishService()

			const dish = await dishService.getDishDetail(req.params.id)

			handlerResponse<DishInterface>(
				res,
				dish,
				`Get dish details succesful with id ${req.params.id}`
			)
		} catch (error) {
			handlerException(res, error)
		}
	}

	@BodyValidator(CreateDishSchema)
	async create(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const dishService = new DishService()

			const dish = await dishService.createDish(req.body as DishInterface)

			handlerResponse<DishInterface>(res, dish, 'Create dish successful')
		} catch (error) {
			handlerException(res, error)
		}
	}

	@BodyValidator(UpdateDishSchema)
	async update(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const dishService = new DishService()

			const dish = await dishService.updateDish(
				req.params.id,
				req.body as DishInterface
			)

			handlerResponse<DishInterface>(
				res,
				dish,
				`Update dish successful with id ${req.params.id}`
			)
		} catch (error) {
			handlerException(res, error)
		}
	}

	async delete(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const dishService = new DishService()

			const dish = await dishService.deleteDish(req.params.id)

			handlerResponse<DishInterface>(
				res,
				dish,
				`Delete dish successful with id ${req.params.id}`
			)
		} catch (error) {
			handlerException(res, error)
		}
	}
}
