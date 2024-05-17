export interface PaginationInterface {
	/**
	 * Represents the number of the current page the user wants to view. It is an index that indicates which result set is being requested.
	 * @example 0
	 */
	page: number

	/**
	 * Take option allows you to limit the number of rows returned from a query
	 * @example 10
	 */
	take: number
}
