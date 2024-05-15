import { ServerResponse } from 'http'
import Joi from 'joi'

import { handlerException, ServiceException } from '../utils'
import { RequestHttpInterface } from '../../core/interfaces'

export const BodyValidator = (schema: Joi.ObjectSchema) => {
	return (
		target: any,
		propertyName: string,
		descriptor: PropertyDescriptor
	) => {
		const method = descriptor.value

		descriptor.value = async (
			req: RequestHttpInterface,
			res: ServerResponse
		) => {
			const body = req.body

			try {
				const { error } = schema.validate(body)

				if (error) {
					throw new ServiceException({
						name: 'BAD REQUEST',
						message: error.message,
						code: 400,
						data: error.details,
					})
				} else {
					method.call(this, req, res)
				}
			} catch (error) {
				handlerException(res, error)
			}
		}
	}
}
