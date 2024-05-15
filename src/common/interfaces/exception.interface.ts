export interface ExceptionInterface {
	/**
	 * Exception name
	 *
	 * @example NOT FOUND
	 */
	name: string

	/**
	 * Exception message
	 *
	 * @example No user found in the service
	 */
	message: string

	/**
	 * Http status to be returned to the client
	 *
	 * @example 401
	 */
	code?: number

	/**
	 * All the detailed information about the error
	 *
	 * @examplem {}
	 */
	data?: Record<string, any>
}
