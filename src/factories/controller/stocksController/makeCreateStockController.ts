import { CreateStockController } from "../../../app/controller/stocksController/CreateStockController";
import { makeCreateStockService } from "../../services/stocksServices/makeCreateStockService";

export function makeCreateStockController() {
  const createStockService = makeCreateStockService();

  return new CreateStockController(createStockService);
}
