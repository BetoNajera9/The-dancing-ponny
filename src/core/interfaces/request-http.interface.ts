import { IncomingMessage } from 'http'

export interface RequestHttpInterface extends IncomingMessage {
	/**
	 * Request parameters
	 *
	 * @example {id: '8jnv9n4c9iicn4i...'}
	 */
	params: Record<string, string>

	/**
	 * Query parameters
	 *
	 * @example {limit: 5, offset: 0}
	 */
	query: Record<string, string | string[] | undefined>
}
