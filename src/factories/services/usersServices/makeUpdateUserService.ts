import { updateUserService } from "../../../app/services/usersServices/UpdateUserService";

export function makeUpdateUserService() {
  return new updateUserService();
}
