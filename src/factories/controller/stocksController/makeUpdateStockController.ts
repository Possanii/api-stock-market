import { UpdateStockController } from "../../../app/controller/stocksController/UpdateStockController";
import { makeUpdateStockService } from "../../services/stocksServices/makeUpdateStockService";

export function makeUpdateStockController() {
  const updateStockService = makeUpdateStockService();

  return new UpdateStockController(updateStockService);
}
