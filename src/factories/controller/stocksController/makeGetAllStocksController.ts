import { GetAllStocksController } from "../../../app/controller/stocksController/GetAllStocksController";
import { makeGetAllStocksService } from "../../services/stocksServices/makeGetAllStocksService";

export function makeGetAllStocksController() {
  const getAllStocksService = makeGetAllStocksService();

  return new GetAllStocksController(getAllStocksService);
}
