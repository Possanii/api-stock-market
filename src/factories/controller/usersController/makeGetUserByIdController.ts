import { GetUserByIdController } from "../../../app/controller/usersController/GetUserByIdController";
import { makeGetUserByIdService } from "../../services/usersServices/makeGetUserByIdService";

export function makeGetUserByIdController() {
  const getUserByIdService = makeGetUserByIdService();

  return new GetUserByIdController(getUserByIdService);
}
