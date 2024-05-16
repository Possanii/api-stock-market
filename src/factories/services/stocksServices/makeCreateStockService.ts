import { CreateStockService } from "../../../app/services/stocksService/CreateStockService";

export function makeCreateStockService() {
  return new CreateStockService();
}
