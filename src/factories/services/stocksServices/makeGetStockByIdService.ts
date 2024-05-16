import { GetStockByIdService } from "../../../app/services/stocksService/GetStockByIdService";

export function makeGetStockByIdService() {
  return new GetStockByIdService();
}
