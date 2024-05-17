export interface RateInterface {
	/**
	 * Id of the user who rated the dish
	 *
	 * @example
	 */
	userId: string

	/**
	 * Number of stars of the plate
	 *
	 * @example 4
	 */
	stars: number

	/**
	 * Comments of the rate
	 *
	 * @example Peruvian ceviche is an explosion of flavor in every bite.
	 */
	comments: string

	/**
	 * timestamp when rate create
	 *
	 * @example 2024-05-17T06:12:14.838Z
	 */
	createdAt?: Date
}
