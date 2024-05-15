import mongoose from 'mongoose'

import { UserInterface } from './interfaces'

const UserSchema = new mongoose.Schema({
	nickName: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
})

export const UserModel = mongoose.model<UserInterface>('User', UserSchema)
