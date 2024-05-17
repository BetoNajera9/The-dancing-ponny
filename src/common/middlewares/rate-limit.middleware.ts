import { IncomingMessage, ServerResponse } from 'http'

import { handlerException, ServiceException } from '../utils'
import { RequestCount } from '../interfaces'

export class RateLimiter {
  private requestCounts: { [key: string]: RequestCount } = {}

  constructor(
    private limit: number,
    private resetTime: number
  ) { }

  /**
   * Verify the number of request by ip
   *
   * @param  {IncomingMessage} req
   * @param  {ServerResponse} res
   * @returns Boolean
   */
  public check(req: IncomingMessage, res: ServerResponse): Boolean {
    const ip = req.socket.remoteAddress || ''
    const endpoint = req.url || ''

    try {
      if (this.requestCounts[ip] && this.requestCounts[ip][endpoint]) {
        if (this.requestCounts[ip][endpoint].count > this.limit)
          throw new ServiceException({
            name: 'RATE LIMIT EXCEEDED',
            message: 'Too many requests, please try again later',
            code: 429,
          })
        else {
          this.requestCounts[ip][endpoint].count++
          return true
        }
      } else {
        if (!this.requestCounts[ip]) {
          this.requestCounts[ip] = {}
        }
        this.requestCounts[ip][endpoint] = {
          count: 1,
          resetTime: Date.now() + this.resetTime,
        }
        this.resetCount(ip, endpoint)

        return true
      }
    } catch (error) {
      handlerException(res, error)

      return false
    }
  }

  /**
   * Function to respect the counter depending on the ip
   *
   * @param  {string} ip
   * @param  {string} endpoint
   * @returns void
   */
  private resetCount(ip: string, endpoint: string): void {
    setTimeout(() => {
      delete this.requestCounts[ip][endpoint]
    }, this.resetTime)
  }
}
