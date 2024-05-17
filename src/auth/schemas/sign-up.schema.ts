import Joi from 'joi'

export const SignUpSchema = Joi.object({
	/**
	 * Nick name of the user
	 *
	 * @example Smeagol
	 */
	nickName: Joi.string()
		.min(3)
		.pattern(new RegExp('^[A-Za-z0-9-_]+$'))
		.required()
		.lowercase(),

	/**
	 * Password to the user
	 *
	 * @example ijcnirnv09j4inciun
	 */
	password: Joi.string()
		.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
		.required(),
})
