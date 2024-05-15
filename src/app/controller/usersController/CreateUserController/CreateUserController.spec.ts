import { ZodError } from "zod";
import { makeCreateUserController } from "../../../../factories/controller/usersController/makeCreateUserController";
import { makeDeleteUserController } from "../../../../factories/controller/usersController/makeDeleteUserController";
import { CreateUserError } from "../../../errors/usersErrors/CreateUserError";
import { IResponse } from "../../../interfaces/IController";
import { IRequest } from "../../../interfaces/IRequest";

let createdUserId: string;

describe("create a new user", () => {
  test("should create a new user", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {
        username: "createUser",
        password: "createUser",
        email: "createUser@example.com",
      },
    } as IRequest);

    if (response.statusCode === 201) {
      const message = response.body!.message as string;
      const idMatch = message.match(/\d+/);
      if (idMatch) {
        createdUserId = idMatch[0];
      }
    }

    expect(response).toEqual(
      expect.objectContaining({
        body: {
          message: expect.stringContaining(
            "User has been successfully created with id:",
          ),
        },
        statusCode: 201,
      }),
    );
  });
});

describe("try to create an user with an email that already exists", () => {
  test("should throw an error for duplicate email", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {
        username: "createUser",
        password: "createUser",
        email: "createUser@example.com",
      },
    } as IRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      message: "Something went wrong while creating user",
      error: expect.any(CreateUserError),
    });
  });
});

describe("create a user with missing data", () => {
  test("should throw an error for invalid data", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {},
    } as IRequest);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: "Invalid data",
      error: expect.any(ZodError),
    });
  });
});

describe("create a user with missing username", () => {
  test("should throw an error for invalid data (username)", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {
        password: "createUser",
        email: "createUser@example.com",
      },
    } as IRequest);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: "Invalid data",
      error: expect.any(ZodError),
    });
  });
});

describe("create a user with missing password", () => {
  test("should throw an error for invalid data (password)", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {
        username: "createUser",
        email: "createUser@example.com",
      },
    } as IRequest);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: "Invalid data",
      error: expect.any(ZodError),
    });
  });
});

describe("create a user with missing password", () => {
  test("should throw an error for invalid data (email)", async () => {
    const response: IResponse = await makeCreateUserController().handle({
      body: {
        username: "createUser",
        password: "createUser",
      },
    } as IRequest);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: "Invalid data",
      error: expect.any(ZodError),
    });
  });
});

afterAll(async () => {
  if (createdUserId) {
    await makeDeleteUserController().handle({
      params: { id: createdUserId } as Record<string, unknown>,
    } as IRequest);
  }
});
