import { ServerResponse } from 'http'
import Joi from 'joi'

import { handlerException, ServiceException } from '../utils'
import { RequestHttpInterface } from '../../core/interfaces'

export const QueryValidator = (schemas: Joi.ObjectSchema[]) => {
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
			const query = req.query

			try {
				for (const schema of schemas) {
					const { error, value } = schema.validate(query)
					if (error) {
						throw new ServiceException({
							name: 'BAD REQUEST',
							message: `In the queries ${error.message}`,
							code: 400,
							data: error.details,
						})
					}

					req.query = {
						...req.query,
						...value,
					}
				}

				method.call(this, req, res)
			} catch (error) {
				handlerException(res, error)
			}
		}
	}
}
