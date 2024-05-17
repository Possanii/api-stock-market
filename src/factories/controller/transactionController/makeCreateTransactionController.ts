import { CreateTransactionController } from "../../../app/controller/transactionController/CreateTransactionController";
import { makeCreateStockWalletService } from "../../services/StocksWalletsService/makeCreateStockWalletService";
import { makeGetStockByIdService } from "../../services/stocksServices/makeGetStockByIdService";
import { makeCreateTransactionService } from "../../services/transactionService/makeCreateTransactionService";

export function makeCreateTransactionController() {
  const createStockWalletService = makeCreateStockWalletService();
  const getStockByIdService = makeGetStockByIdService();
  const createTransactionService = makeCreateTransactionService();

  return new CreateTransactionController(
    createStockWalletService,
    getStockByIdService,
    createTransactionService,
  );
}
