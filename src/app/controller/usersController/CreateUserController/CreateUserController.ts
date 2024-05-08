import z, { ZodError } from "zod";
import { CreateUserError } from "../../../errors/usersErrors/CreateUserError";
import { IController, IResponse } from "../../../interfaces/IController";
import { IRequest } from "../../../interfaces/IRequest";
import { CreateUserService } from "../../../services/usersServices/CreateUserService";

const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
});

export class CreateUserController implements IController {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, password, email } = createUserSchema.parse(body);

      const { id } = await this.createUserService.execute({
        username,
        password,
        email,
      });

      return {
        statusCode: 201,
        body: { message: "User has been successfully created with id: " + id },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateUserError) {
        return {
          statusCode: 400,
          body: {
            message: "Something went wrong while creating user",
            error: err,
          },
        };
      }

      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }
}
