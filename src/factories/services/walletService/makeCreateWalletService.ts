import { CreateWalletService } from "../../../app/services/walletService/CreateWalletService";

export function makeCreateWalletService() {
  return new CreateWalletService();
}
