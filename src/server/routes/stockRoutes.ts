import { makeCreateStockController } from "../../factories/controller/stocksController/makeCreateStockController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/stock", routeAdapter(makeCreateStockController()));
