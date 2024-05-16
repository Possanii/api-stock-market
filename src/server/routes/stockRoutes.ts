import { makeCreateStockController } from "../../factories/controller/stocksController/makeCreateStockController";
import { makeGetStockByIdController } from "../../factories/controller/stocksController/makeGetStockByIdController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/stock", routeAdapter(makeCreateStockController()));

app.get("/stock/:id", routeAdapter(makeGetStockByIdController()));
