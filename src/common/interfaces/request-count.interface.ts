export interface RequestCount {
	[key: string]: {
		/**
		 * Number of requests to the service
		 *
		 * @example 89
		 */
		count: number

		/**
		 * Time in milliseconds to reset number of requests
		 *
		 * @example 60000
		 */
		resetTime: number
	}
}
