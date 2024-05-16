import { UpdateStockService } from "../../../app/services/stocksService/UpdateStockService";

export function makeUpdateStockService() {
  return new UpdateStockService();
}
