import { DeleteStockService } from "../../../app/services/stocksService/DeleteStockService";

export function makeDeleteStockService() {
  return new DeleteStockService();
}
