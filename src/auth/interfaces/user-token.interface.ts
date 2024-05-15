import { UserInterface } from "../../user/interfaces";

export interface UserTokenInterface {
  /**
   * User data
   *
   * @example { nickName: 'Sméagol', password: 'jr943hn98unc9' }
   */
  user: UserInterface,

  /**
   * Token for access to some routes
   *
   * @example mndo948ncuincun83n...
   */
  accessToken: string
}