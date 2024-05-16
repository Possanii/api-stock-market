import { makeCreateWalletController } from "../../factories/controller/walletController/makeCreateWalletController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/wallet", routeAdapter(makeCreateWalletController()));
