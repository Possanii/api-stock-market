import { makeCreateUserController } from "../../factories/controller/usersController/makeCreateUserController";
import { makeUpdateUserController } from "../../factories/controller/usersController/makeUpdateUserController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/user", routeAdapter(makeCreateUserController()));

app.put("/user", routeAdapter(makeUpdateUserController()));
