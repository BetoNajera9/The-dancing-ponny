import { MetaInterface } from './meta.interface'

export interface ResponseInterface<T> {
	/**
	 * Information if the request was successful
	 *
	 * @example true
	 */
	success: boolean

	/**
	 * General information of the response
	 *
	 * @example The user was successfully created
	 */
	message: string

	/**
	 * Response details
	 *
	 * @example {}
	 */
	data?: T

	/**
	 * Meta data
	 *
	 * @example MetaInterface
	 */
	meta?: MetaInterface
}
