import { CreateUserController } from "../../../app/controller/usersController/CreateUserController";
import { makeCreateUserService } from "../../services/usersServices/makeCreateUserService";

export function makeCreateUserController() {
  const createUserService = makeCreateUserService();

  return new CreateUserController(createUserService);
}
