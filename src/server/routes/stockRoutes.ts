import { makeCreateStockController } from "../../factories/controller/stocksController/makeCreateStockController";
import { makeDeleteStockController } from "../../factories/controller/stocksController/makeDeleteStockController";
import { makeGetAllStocksController } from "../../factories/controller/stocksController/makeGetAllStocksController";
import { makeGetStockByIdController } from "../../factories/controller/stocksController/makeGetStockByIdController";
import { makeUpdateStockController } from "../../factories/controller/stocksController/makeUpdateStockController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/stock", routeAdapter(makeCreateStockController()));

app.get("/stock/:id", routeAdapter(makeGetStockByIdController()));

app.get("/stock", routeAdapter(makeGetAllStocksController()));

app.put("/stock", routeAdapter(makeUpdateStockController()));

app.delete("/stock/:id", routeAdapter(makeDeleteStockController()));
