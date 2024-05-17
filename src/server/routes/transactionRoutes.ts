import { makeCreateTransactionController } from "../../factories/controller/transactionController/makeCreateTransactionController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/transaction", routeAdapter(makeCreateTransactionController()));
