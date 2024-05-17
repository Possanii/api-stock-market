import { CreateStockWalletService } from "../../../app/services/StocksWalletsService/CreateStockWalletService";
import { makeValidateTransactionIsValid } from "../transactionService/makeValidateTransactionIsValid";

export function makeCreateStockWalletService() {
  const validateTransactionIsValid = makeValidateTransactionIsValid();

  return new CreateStockWalletService(validateTransactionIsValid);
}
