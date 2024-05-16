import { GetStockByIdController } from "../../../app/controller/stocksController/GetStockByIdController";
import { makeGetStockByIdService } from "../../services/stocksServices/makeGetStockByIdService";

export function makeGetStockByIdController() {
  const getStockByIdService = makeGetStockByIdService();

  return new GetStockByIdController(getStockByIdService);
}
