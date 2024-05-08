import { DeleteUserService } from "../../../app/services/usersServices/DeleteUserService";

export function makeDeleteUserService() {
  return new DeleteUserService();
}
