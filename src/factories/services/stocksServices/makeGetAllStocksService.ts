import { GetAllStocksService } from "../../../app/services/stocksService/GetAllStocksService";

export function makeGetAllStocksService() {
  return new GetAllStocksService();
}
