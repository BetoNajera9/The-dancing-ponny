export interface ResponseHttpInterface<T> {
  /**
   * The response data object
   *
   * @example {}
   */
  data: T

  /**
   * The response status code
   *
   * @example 400
   */
  status?: number

  /**
   * The response content type
   *
   * @example application/json
   */
  contentType?: string
}