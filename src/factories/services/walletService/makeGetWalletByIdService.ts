import { GetWalletByIdService } from "../../../app/services/walletService/GetWalletByIdService";

export function makeGetWalletByIdService() {
  return new GetWalletByIdService();
}
