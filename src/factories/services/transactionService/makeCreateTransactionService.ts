import { CreateTransactionService } from "../../../app/services/transactionService/CreateTransactionService";

export function makeCreateTransactionService() {
  return new CreateTransactionService();
}
