import Joi from 'joi'

export const CreateDishSchema = Joi.object({
	/**
	 * Name of the dish
	 *
	 * @example Bell Gamgee Pumpkin Pie
	 */
	name: Joi.string().required(),

	/**
	 * Details of the dish
	 *
	 * @example A succulent pumpkin and spice pie, slow baked in a wood-fired oven and served with a generous dollop of fresh cream from the Brandybucks' farm
	 */
	description: Joi.string().required(),

	/**
	 * Dish image path
	 *
	 * @example www.the-dancing-ponny/bell-gamgee-pumpkin-pie
	 */
	image: Joi.string().optional(),

	/**
	 * Price of the dish in Silver Crowns
	 *
	 * @example 3
	 */
	price: Joi.number().required(),
})
