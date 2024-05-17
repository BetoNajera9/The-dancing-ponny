import mongoose from 'mongoose'

import { DishInterface } from './interfaces'

export const RateSchema = new mongoose.Schema(
	{
		/**
		 * Id of the user who rated the dish
		 *
		 * @example
		 */
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
			unique: true,
			ref: 'User',
		},

		/**
		 * Number of stars of the plate
		 *
		 * @example 4
		 */
		stars: {
			type: Number,
			required: true,
		},

		/**
		 * Comments of the rate
		 *
		 * @example Peruvian ceviche is an explosion of flavor in every bite.
		 */
		comments: {
			type: String,
			required: true,
		},
	},
	{ timestamps: { createdAt: true } }
)

const DishSchema = new mongoose.Schema(
	{
		/**
		 * Name of the dish
		 *
		 * @example Bell Gamgee Pumpkin Pie
		 */
		name: {
			type: String,
			required: true,
			unique: true,
		},

		/**
		 * Details of the dish
		 *
		 * @example A succulent pumpkin and spice pie, slow baked in a wood-fired oven and served with a generous dollop of fresh cream from the Brandybucks' farm
		 */
		description: {
			type: String,
			required: true,
			unique: true,
		},

		/**
		 * Dish image path
		 *
		 * @example www.the-dancing-ponny/bell-gamgee-pumpkin-pie
		 */
		image: {
			type: String,
		},

		/**
		 * Price of the dish in Silver Crowns
		 *
		 * @example 3
		 */
		price: {
			type: Number,
			required: true,
		},

		/**
		 * Array of RateSchema
		 *
		 * @example RateSchema[]
		 */
		rate: [RateSchema],
	},
	{ timestamps: { createdAt: true } }
)

export const DishModel = mongoose.model<DishInterface>('Dish', DishSchema)
