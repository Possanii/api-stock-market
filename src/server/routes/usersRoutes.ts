import { makeCreateUserController } from "../../factories/controller/usersController/makeCreateUserController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/user", routeAdapter(makeCreateUserController()));
