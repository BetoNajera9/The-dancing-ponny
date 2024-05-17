import Joi from 'joi'

export const RateDishSchema = Joi.object({
	/**
	 * Number of stars of the plate
	 *
	 * @example 4
	 */
	stars: Joi.number().integer().min(0).max(5).required(),

	/**
	 * Comments of the rate
	 *
	 * @example Peruvian ceviche is an explosion of flavor in every bite.
	 */
	comments: Joi.string().required(),
})
