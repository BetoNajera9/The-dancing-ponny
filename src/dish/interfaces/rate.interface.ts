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
}
