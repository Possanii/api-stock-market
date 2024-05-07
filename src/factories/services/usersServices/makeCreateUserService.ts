import { CreateUserService } from "../../../app/services/usersServices/CreateUserService";

export function makeCreateUserService() {
  return new CreateUserService();
}
