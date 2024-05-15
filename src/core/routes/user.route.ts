import * as UserModule from '../../user/user.controller'

export const userRouter: Record<string, any> = {
  '/user': {
    GET: UserModule.getUsers
  }
}