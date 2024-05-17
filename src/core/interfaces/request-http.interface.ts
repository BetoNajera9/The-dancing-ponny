import { IncomingMessage } from 'http'

import { PayloadInterface } from '../../auth/interfaces'

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

	/**
	 * Body parameters
	 *
	 * @example {email: 'example@email.com, password: 'jenciuen'}
	 */
	body: Record<string, any>

	/**
	 * Payload decrypted from the access token
	 *
	 * @example {
	 * 	userId: '6646a3af9452b3b7ddd05118',
	 * 	iat: 1715919942,
	 * 	exp: 1715919972
	 * }
	 */
	payload?: PayloadInterface
}
