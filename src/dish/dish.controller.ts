import { ServerResponse } from 'http'

import { CreateDishSchema, RateDishSchema, UpdateDishSchema } from './schemas'
import { handlerException, handlerResponse } from '../common/utils'
import { PaginationSchema, SearchSchema } from '../common/schemas'
import { DishInterface, RateInterface } from './interfaces'
import { PaginationInterface } from '../common/interfaces'
import { RequestHttpInterface } from '../core/interfaces'
import { DishService } from './dish.service'
import {
	QueryValidator,
	AuthValidator,
	BodyValidator,
} from '../common/decorators'

export class DishController {
	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
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

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
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

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
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

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
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

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
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

	/**
	 * @param  {RequestHttpInterface} req
	 * @param  {ServerResponse} res
	 * @returns Promise
	 */
	@AuthValidator
	@BodyValidator(RateDishSchema)
	async rate(req: RequestHttpInterface, res: ServerResponse): Promise<void> {
		try {
			const rateDish: RateInterface = {
				userId: req.payload.userId,
				stars: req.body.stars,
				comments: req.body.comments,
			}

			const dishService = new DishService()
			const dish = await dishService.rateDish(req.params.id, rateDish)

			handlerResponse<RateInterface>(res, dish, `Rate dish successful`)
		} catch (error) {
			handlerException(res, error)
		}
	}
}
