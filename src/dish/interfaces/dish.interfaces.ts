export interface DishInterface {
	/**
	 * Name of the dish
	 *
	 * @example Bell Gamgee Pumpkin Pie
	 */
	name: string

	/**
	 * Details of the dish
	 *
	 * @example A succulent pumpkin and spice pie, slow baked in a wood-fired oven and served with a generous dollop of fresh cream from the Brandybucks' farm
	 */
	description: string

	/**
	 * Dish image path
	 *
	 * @example www.the-dancing-ponny/bell-gamgee-pumpkin-pie
	 */
	image?: string

	/**
	 * Price of the dish in Silver Crowns
	 *
	 * @example 3
	 */
	price: number
}
