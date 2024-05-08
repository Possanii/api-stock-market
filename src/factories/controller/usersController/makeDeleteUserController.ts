import { DeleteUserController } from "../../../app/controller/usersController/DeleteUserController";
import { makeDeleteUserService } from "../../services/usersServices/makeDeleteUserService";

export function makeDeleteUserController() {
  const deleteUserService = makeDeleteUserService();

  return new DeleteUserController(deleteUserService);
}
