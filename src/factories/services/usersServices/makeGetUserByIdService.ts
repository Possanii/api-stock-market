import { GetUserByIdService } from "../../../app/services/usersServices/GetUserByIdService";

export function makeGetUserByIdService() {
  return new GetUserByIdService();
}
