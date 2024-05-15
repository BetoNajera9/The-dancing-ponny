import { Document } from 'mongoose'

export interface UserInterface extends Document {
	/**
	 * Nick name of the user
	 *
	 * @example Sméagol
	 */
	nickName: string

	/**
	 * Password to the user
	 *
	 * @example ijcnirnv09j4inciun
	 */
	password: string
}
