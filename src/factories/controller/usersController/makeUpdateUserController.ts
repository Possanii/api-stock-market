import { UpdateUserController } from "../../../app/controller/usersController/UpdateUserController";
import { makeUpdateUserService } from "../../services/usersServices/makeUpdateUserService";

export function makeUpdateUserController() {
  const updateUserService = makeUpdateUserService();

  return new UpdateUserController(updateUserService);
}
