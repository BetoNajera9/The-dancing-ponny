import mongoose from 'mongoose'

import { DishInterface } from './interfaces'

const DishSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},

	description: {
		type: String,
		required: true,
	},

	image: {
		type: String,
	},

	price: {
		type: Number,
		required: true,
	},
})

export const DishModel = mongoose.model<DishInterface>('Dish', DishSchema)
