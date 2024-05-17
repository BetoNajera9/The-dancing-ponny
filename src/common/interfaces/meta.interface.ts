export interface MetaInterface {
	/**
	 * Get the page
	 * @example 1
	 */
	page: number

	/**
	 * Get the take
	 * @example 10
	 */
	take: number

	/**
	 * Get the item count
	 * @example 1
	 */
	itemCount: number

	/**
	 * Get the page
	 * @example 2
	 */
	pageCount: number

	/**
	 * Know if you have a previous page
	 * @example false
	 */
	hasPreviousPage: boolean

	/**
	 * Know if you have a next page
	 * @example true
	 */
	hasNextPage: boolean
}
