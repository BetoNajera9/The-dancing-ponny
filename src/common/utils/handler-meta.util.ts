import { MetaInterface, PaginationInterface } from '../interfaces'

/**
 * The MetaInterface object is generated
 *
 * @param  {PaginationInterface} pagination
 * @param  {number} itemCount
 * @returns MetaInterface
 */
export const handlerMeta = (
	pagination: PaginationInterface,
	itemCount: number
): MetaInterface => {
	const pageCount = Math.ceil(itemCount / pagination.take)

	return {
		page: pagination.page,
		take: pagination.take,
		itemCount,
		pageCount,
		hasPreviousPage: pagination.page > 1,
		hasNextPage: pagination.page < pageCount,
	}
}
