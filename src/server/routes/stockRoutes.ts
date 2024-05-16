import { makeCreateStockController } from "../../factories/controller/stocksController/makeCreateStockController";
import { makeGetAllStocksController } from "../../factories/controller/stocksController/makeGetAllStocksController";
import { makeGetStockByIdController } from "../../factories/controller/stocksController/makeGetStockByIdController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/stock", routeAdapter(makeCreateStockController()));

app.get("/stock/:id", routeAdapter(makeGetStockByIdController()));

app.get("/stock", routeAdapter(makeGetAllStocksController()));
