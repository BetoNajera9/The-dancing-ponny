import { IncomingMessage, ServerResponse } from "http";

import { handlerException, handlerResponse } from "../common/utils";
import { UserService } from './user.service';
import { UserInterface } from "./interfaces";

const userService = new UserService()

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await userService.getAllUsers()

    handlerResponse<UserInterface[]>(res, users, 'Users found successful')
  } catch (error) {
    handlerException(res, error)
  }
}