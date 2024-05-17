import Joi from 'joi'

export const PaginationSchema = Joi.object({
	/**
	 * The offset allows you to omit a specified number of rows before the beginning of the result set.
	 * @example 1
	 */
	page: Joi.number().integer().default(1).min(1),

	/**
	 * The limit option allows you to limit the number of rows returned from a query
	 * @example 10
	 */
	take: Joi.number().integer().default(10).min(1),
}).options({ stripUnknown: true })
