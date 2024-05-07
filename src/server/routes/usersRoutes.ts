import { makeCreateUserController } from "../../factories/controller/usersController/makeCreateUserController";
import { makeGetUserByIdController } from "../../factories/controller/usersController/makeGetUserByIdController";
import { makeUpdateUserController } from "../../factories/controller/usersController/makeUpdateUserController";
import { routeAdapter } from "../adapters/routeAdapter";
import app from "../config";

app.post("/user", routeAdapter(makeCreateUserController()));

app.put("/user", routeAdapter(makeUpdateUserController()));

app.get("/user/:id", routeAdapter(makeGetUserByIdController()));
