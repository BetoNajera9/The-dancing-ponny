import * as AuthModule from '../../auth/auth.controller'

export const authRouter: Record<string, any> = {
  '/login': {
    POST: AuthModule.login
  },

  '/sign-up': {
    POST: AuthModule.signUp
  }
}