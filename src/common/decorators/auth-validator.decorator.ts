import { ServerResponse } from 'http'
import Jwt from 'jsonwebtoken'

import { handlerException, ServiceException } from '../utils'
import { RequestHttpInterface } from '../../core/interfaces'
import { PayloadInterface } from '../../auth/interfaces'
import { envs } from '../../config'

export const AuthValidator = (
	target: any,
	propertyName: string,
	descriptor: PropertyDescriptor
) => {
	const method = descriptor.value

	descriptor.value = async (req: RequestHttpInterface, res: ServerResponse) => {
		try {
			const accessToken = req.headers?.authorization?.replace('Bearer ', '')

			if (!accessToken)
				throw new ServiceException({
					name: 'UNATHORIZED',
					message: 'Invalid access token',
					code: 401,
				})

			const payload = Jwt.verify(
				accessToken,
				envs.jwtSecret
			) as PayloadInterface

			req.payload = payload

			method.call(this, req, res)
		} catch (error) {
			handlerException(res, error)
		}
	}
}
