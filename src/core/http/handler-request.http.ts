import { IncomingMessage, ServerResponse } from 'http'
import url from 'url'

import { RequestHttpInterface } from '../interfaces';
import routes from '../routes'

/**
 * Determines if the url has a controller to execute or if the path does not exist.
 *
 * @param  {import('http').IncomingMessage} req - The server request object
 * @param  {import('http').ServerResponse} res - The server response object
 */
export const handlerRequest = (req: IncomingMessage, res: ServerResponse) => {
  const request = { ...req, query: {} } as RequestHttpInterface

  const parsedUrl = url.parse(req.url ?? '/', true)
  const method = req.method?.toUpperCase() ?? 'GET'
  const path = parsedUrl.pathname ?? '/'

  for (const key in parsedUrl.query)
    request.query[key] = parsedUrl.query[key]

  let handler = routes[path] && routes[path][method]

  if (!handler) {
    const routeKeys = Object.keys(routes).filter((key) => key.includes(':'))

    const urlWithParamsRegex = (key: string) =>
      new RegExp(`^${key.replace(/:[^/]+/g, '([^/]+)')}$`)

    const matchedKey = routeKeys.find((key) =>
      urlWithParamsRegex(key).test(path)
    )

    if (matchedKey) {
      const paramKeys =
        matchedKey.match(/:[^/]+/g)?.map((key) => key.substring(1)) || []
      const dynamicParams =
        urlWithParamsRegex(matchedKey).exec(path)?.slice(1) || []

      const dynamicHandler = routes[matchedKey][method]

      const params = dynamicParams?.reduce(
        (object, name, index) => ({ ...object, [paramKeys[index]]: name }),
        {}
      )

      request.params = params

      handler = dynamicHandler
    } else
      handler = routes.notFound
  }

  handler(req, res)
}
