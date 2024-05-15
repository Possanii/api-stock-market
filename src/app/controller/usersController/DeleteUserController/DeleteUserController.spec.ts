import { ZodError } from "zod";
import { makeCreateUserController } from "../../../../factories/controller/usersController/makeCreateUserController";
import { makeDeleteUserController } from "../../../../factories/controller/usersController/makeDeleteUserController";
import { UserNotFound } from "../../../errors/usersErrors/UserNotFound";
import { IRequest } from "../../../interfaces/IRequest";

describe("Delete an user by id", () => {
  test("Should delete a user by id", async () => {
    const response = await makeCreateUserController().handle({
      body: {
        username: "deleteUser",
        password: "deleteUser",
        email: "deleteUser@example.com",
      },
    } as IRequest);

    const message = response.body!.message as string;
    const idMatch = message.match(/\d+/);
    if (idMatch) {
      const response = await makeDeleteUserController().handle({
        params: { id: idMatch[0] } as Record<string, unknown>,
      } as IRequest);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        message: "The user " + idMatch[0] + " has been successfully deleted",
      });
    }
  });
});

describe("Delete user with invalid id", () => {
  test("Should throw a error because id doesn't exists", async () => {
    const response = await makeDeleteUserController().handle({
      params: { id: "9999999999" } as Record<string, unknown>,
    } as IRequest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      message: "Something went wrong while deleting user",
      error: expect.any(UserNotFound),
    });
  });
});

describe("Delete user without send the id", () => {
  test("Should throw a error because id is not sent", async () => {
    const response = await makeDeleteUserController().handle({
      params: { id: undefined } as Record<string, unknown>,
    } as IRequest);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: "Invalid data",
      error: expect.any(ZodError),
    });
  });
});
