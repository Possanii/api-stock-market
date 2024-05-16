import { CreateWalletController } from "../../../app/controller/walletController/CreateWalletController";
import { makeCreateWalletService } from "../../services/walletService/makeCreateWalletService";

export function makeCreateWalletController() {
  const createWalletService = makeCreateWalletService();

  return new CreateWalletController(createWalletService);
}
