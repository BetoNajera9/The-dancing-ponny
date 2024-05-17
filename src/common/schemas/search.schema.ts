import Joi from 'joi'

export const SearchSchema = Joi.object({
	/**
	 * The string to search for a particular object
	 * @example Bell Gamgee Pumpkin Pie
	 */
	search: Joi.string().lowercase().default(''),
}).options({ stripUnknown: true })
