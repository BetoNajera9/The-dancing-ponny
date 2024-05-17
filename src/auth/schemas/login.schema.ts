import Joi from 'joi'

export const LoginSchema = Joi.object({
	/**
	 * Nick name of the user
	 *
	 * @example Smeagol
	 */
	nickName: Joi.string().required(),

	/**
	 * Password to the user
	 *
	 * @example ijcnirnv09j4inciun
	 */
	password: Joi.string().required(),
})
