import { DeleteStockController } from "../../../app/controller/stocksController/DeleteStockController";
import { makeDeleteStockService } from "../../services/stocksServices/makeDeleteStockService";

export function makeDeleteStockController() {
  const deleteStockService = makeDeleteStockService();

  return new DeleteStockController(deleteStockService);
}
