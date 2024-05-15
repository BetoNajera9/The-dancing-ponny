import { ExceptionInterface } from '../interfaces/exception.interface'

/**
 * Customized service exception
 *
 * @param  {ExceptionInterface} porperties - Exception properties for greater control
 */
export class ServiceException extends Error {
	private readonly data: Record<string, any>
	readonly code: number
	name: string

	constructor({ name, message, code = 500, data = {} }: ExceptionInterface) {
		super(message)
		this.name = name
		this.code = code
		this.data = data
	}

	toString() {
		return `${this.name} - ${this.message}`
	}

	get moreInfo() {
		return this.data
	}
}
