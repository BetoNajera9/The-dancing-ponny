import Joi from 'joi'

export const LoginSchema = Joi.object({
	nickName: Joi.string().min(3).required(),
	password: Joi.string()
		.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
		.required(),
})
