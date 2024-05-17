import { ValidateTransactionIsValid } from "../../../app/services/transactionService/ValidateTransactionIsValid";
import { makeGetStockByIdService } from "../stocksServices/makeGetStockByIdService";
import { makeGetWalletByIdService } from "../walletService/makeGetWalletByIdService";

export function makeValidateTransactionIsValid() {
  const getWalletByIdService = makeGetWalletByIdService();
  const getStockByIdService = makeGetStockByIdService();

  return new ValidateTransactionIsValid(
    getStockByIdService,
    getWalletByIdService,
  );
}
