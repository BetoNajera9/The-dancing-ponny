import mongoose from 'mongoose'

import { DishInterface } from './interfaces'

export const RateSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
			unique: true,
			ref: 'User',
		},

		stars: {
			type: Number,
			required: true,
		},

		comments: {
			type: String,
			required: true,
		},
	},
	{ timestamps: { createdAt: true } }
)

const DishSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},

		description: {
			type: String,
			required: true,
			unique: true,
		},

		image: {
			type: String,
		},

		price: {
			type: Number,
			required: true,
		},

		rate: [RateSchema],
	},
	{ timestamps: { createdAt: true } }
)

export const DishModel = mongoose.model<DishInterface>('Dish', DishSchema)
