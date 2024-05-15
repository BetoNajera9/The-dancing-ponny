import { IncomingMessage, ServerResponse } from 'http'

import { handlerException, handlerResponse } from '../common/utils'
import { UserInterface } from '../user/interfaces'
import { UserTokenInterface } from './interfaces'
import { AuthService } from './auth.service'
import { handlerBody } from '../core/http'

const authService = new AuthService()

// TODO: Validate body
export const login = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await handlerBody<UserInterface>(req)

    const { nickName, password } = body

    const user = await authService.login(nickName, password)

    handlerResponse<UserTokenInterface>(res, user, 'Login seccessful')
  } catch (error) {
    handlerException(res, error)
  }
}

// TODO: Validate body
export const signUp = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await handlerBody<UserInterface>(req)

    const user = await authService.signUp(body)

    handlerResponse<UserTokenInterface>(res, user, 'User was created seccessful')
  } catch (error) {
    handlerException(res, error)
  }
}
