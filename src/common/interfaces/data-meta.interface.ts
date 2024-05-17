import { MetaInterface } from './meta.interface'

export interface DataMetaInterface<T> {
	/**
	 * Response details
	 *
	 * @example {}
	 */
	data: T

	/**
	 * Meta data
	 *
	 * @example MetaInterface
	 */
	meta: MetaInterface
}
