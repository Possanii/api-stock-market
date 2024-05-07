import z, { ZodError } from "zod";
import { UserNotFound } from "../../errors/usersErrors/UserNotFound";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";
import { updateUserService } from "../../services/usersServices/UpdateUserService";

const updateUserSchema = z.object({
  id: z.union([
    z
      .string()
      .min(1)
      .transform((value) => Number(value)),
    z.number().min(1),
  ]),
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
});

export class UpdateUserController implements IController {
  constructor(private readonly updateUserService: updateUserService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, password, email, id } = updateUserSchema.parse(body);

      const userFound = await this.updateUserService.execute({
        username,
        password,
        email,
        id,
      });

      if (!userFound) {
        throw new UserNotFound();
      }

      return {
        statusCode: 204,
        body: {
          message: "User with id " + id + " has been successfully updated",
        },
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { message: "User not found", error: err },
        };
      }

      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }
}
