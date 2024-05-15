import { ZodError } from "zod";
import { makeCreateUserController } from "../../../../factories/controller/usersController/makeCreateUserController";
import { makeDeleteUserController } from "../../../../factories/controller/usersController/makeDeleteUserController";
import { makeGetUserByIdController } from "../../../../factories/controller/usersController/makeGetUserByIdController";
import { UserNotFound } from "../../../errors/usersErrors/UserNotFound";
import { IRequest } from "../../../interfaces/IRequest";

describe("Get an user by id", () => {
  test("Should return the user", async () => {
    let idMatch: RegExpMatchArray | null = null;
    try {
      const createUserResponse = await makeCreateUserController().handle({
        body: {
          username: "getUserById",
          password: "getUserById",
          email: "getUserById@example.com",
        },
      } as IRequest);

      const message = createUserResponse.body!.message as string;
      idMatch = message.match(/\d+/);
      if (idMatch) {
        const getUserResponse = await makeGetUserByIdController().handle({
          params: { id: idMatch[0] } as Record<string, unknown>,
        } as IRequest);

        expect(getUserResponse.statusCode).toBe(200);
        expect(getUserResponse.body!.user).toEqual(expect.any(Object));
        expect(getUserResponse.body!.user).toMatchObject({
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
          email: expect.any(String),
        });
      }
    } finally {
      if (idMatch) {
        await makeDeleteUserController().handle({
          params: { id: idMatch[0] } as Record<string, unknown>,
        } as IRequest);
      }
    }
  });
});

describe("Get user with invalid id", () => {
  test("Should throw a error because id doesn't exists", async () => {
    const response = await makeGetUserByIdController().handle({
      params: { id: "9999999999" } as Record<string, unknown>,
    } as IRequest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      message: "Something went wrong while getting user",
      error: expect.any(UserNotFound),
    });
  });
});

describe("Get user without send the id", () => {
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
